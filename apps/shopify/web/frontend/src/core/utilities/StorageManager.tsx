import { StorageManagerClass } from "@moose-desk/core";

type TokenTypes = "base_token" | "refresh_token";

type StorageType = "isAcceptUsing" | TokenTypes;

export default new StorageManagerClass<StorageType>();
