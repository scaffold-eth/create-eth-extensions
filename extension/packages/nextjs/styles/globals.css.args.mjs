export const globalStyles = `@layer base {
  :root {
    --text-inverse: theme(colors.gray.50);
    --text-foreground: theme(colors.gray.950);
    --text-foreground-muted: theme(colors.gray.600);
    --text-error: theme(colors.rose.600);
    --text-primary: theme(colors.indigo.600);
    --text-success: theme(colors.lime.600);
    --text-warning: theme(colors.orange.600);
    --text-disabled: theme(colors.gray.400);

    --bg-default: theme(colors.gray.50);
    --bg-default-hover: theme(colors.gray.200);
    --bg-default-active: theme(colors.gray.300);
    --bg-alternate: theme(colors.gray.200);
    --bg-alternate-hover: theme(colors.gray.300);
    --bg-alternate-active: theme(colors.gray.400);
    --bg-inverse: theme(colors.gray.100);
    --bg-inverse-hover: theme(colors.gray.200);
    --bg-inverse-active: theme(colors.gray.300);
    --bg-primary: theme(colors.indigo.600);
    --bg-primary-hover: theme(colors.indigo.700);
    --bg-primary-active: theme(colors.indigo.800);
    --bg-secondary: theme(colors.slate.200);
    --bg-secondary-hover: theme(colors.slate.300);
    --bg-secondary-active: theme(colors.slate.400);
    --bg-error: theme(colors.rose.600);
    --bg-warning: theme(colors.orange.600);
    --bg-success: theme(colors.lime.300);
  }
}
`;
