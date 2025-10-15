const ENVIO_GRAPHQL_URL = "http://localhost:8080/v1/graphql";

export interface EventData {
  id: string;
  [key: string]: any;
}

export interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

export interface EntityInfo {
  name: string;
  fields: Array<{
    name: string;
    type: string;
  }>;
}

// Parse GraphQL schema to extract entity information
export function parseSchemaEntities(schemaContent: string): EntityInfo[] {
  const entities: EntityInfo[] = [];
  const lines = schemaContent.split("\n");

  let currentEntity: EntityInfo | null = null;

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Check for type definition - schema.graphql only contains event entities
    if (trimmedLine.startsWith("type ") && !trimmedLine.includes("(")) {
      const typeName = trimmedLine.replace("type ", "").replace(" {", "").trim();

      // All types in schema.graphql are event entities, so include them all
      if (typeName) {
        currentEntity = {
          name: typeName,
          fields: [],
        };
        entities.push(currentEntity);
      }
    }

    // Parse fields within a type
    if (currentEntity && trimmedLine.includes(":") && !trimmedLine.startsWith("type ")) {
      const fieldMatch = trimmedLine.match(/(\w+):\s*([^!]+)/);
      if (fieldMatch) {
        const fieldName = fieldMatch[1];
        const fieldType = fieldMatch[2].replace("!", "").trim();
        currentEntity.fields.push({
          name: fieldName,
          type: fieldType,
        });
      }
    }

    // Reset when we hit a closing brace
    if (trimmedLine === "}") {
      currentEntity = null;
    }
  }

  return entities;
}

// Generate dynamic queries based on schema entities
export function generateEventCountsQuery(entities: EntityInfo[]): string {
  // Since this GraphQL endpoint doesn't support aggregates, we'll fetch all records and count them
  const countQueries = entities
    .map(
      entity =>
        `    ${entity.name} {
      id
    }`,
    )
    .join("\n");

  return `query GetEventCounts {
${countQueries}
  }`;
}

export function generateRecentEventsQuery(entities: EntityInfo[], limit: number = 10): string {
  const eventQueries = entities
    .map(entity => {
      const fields = entity.fields.map(field => `      ${field.name}`).join("\n");
      return `    ${entity.name}(limit: ${limit}, order_by: { id: desc }) {
${fields}
    }`;
    })
    .join("\n");

  return `query GetRecentEvents {
${eventQueries}
  }`;
}

export async function queryGraphQL<T>(query: string, variables?: Record<string, any>): Promise<GraphQLResponse<T>> {
  try {
    const response = await fetch(ENVIO_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error("GraphQL errors:", result.errors);
      throw new Error(`GraphQL errors: ${result.errors.map((e: any) => e.message).join(", ")}`);
    }

    return result;
  } catch (error) {
    console.error("GraphQL query error:", error);
    throw error;
  }
}

// Fetch schema and generate dynamic queries
export async function getSchemaEntities(): Promise<EntityInfo[]> {
  // Always use the static schema.graphql file since it only contains the entities we want
  return getStaticSchemaEntities();
}

// Fallback: read schema from file
async function getStaticSchemaEntities(): Promise<EntityInfo[]> {
  try {
    const response = await fetch("/api/envio/schema");
    const schemaContent = await response.text();
    return parseSchemaEntities(schemaContent);
  } catch (error) {
    console.error("Failed to fetch static schema:", error);
    return [];
  }
}

export async function getEventCounts() {
  const entities = await getSchemaEntities();
  if (entities.length === 0) {
    console.warn("No entities found in schema");
    return {};
  }

  const query = generateEventCountsQuery(entities);
  const result = await queryGraphQL<Record<string, any[]>>(query);

  // Count the results for each entity
  const counts: Record<string, number> = {};
  entities.forEach(entity => {
    const data = result.data[entity.name];
    counts[entity.name] = Array.isArray(data) ? data.length : 0;
  });

  return counts;
}

export async function getRecentEvents(limit: number = 10) {
  const entities = await getSchemaEntities();
  if (entities.length === 0) {
    console.warn("No entities found in schema");
    return {};
  }

  const query = generateRecentEventsQuery(entities, limit);
  const result = await queryGraphQL<Record<string, any[]>>(query);
  return result.data;
}
