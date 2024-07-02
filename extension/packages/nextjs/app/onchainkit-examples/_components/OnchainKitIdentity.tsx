import { Address as Addr, Avatar, Badge, Identity, Name } from "@coinbase/onchainkit/identity";

export const OnchainKitIdentity = () => {
  return (
    <Identity
      address="0x34aA3F359A9D614239015126635CE7732c18fDF3"
      schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
    >
      <Avatar />
      <Name>
        <Badge />
      </Name>
      <Addr />
    </Identity>
  );
};
