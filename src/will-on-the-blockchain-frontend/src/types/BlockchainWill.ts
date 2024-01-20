/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace BlockchainWill {
  export type PersonStruct = {
    name: string;
    citizenshipCardId: string;
    birthdate: BigNumberish;
  };

  export type PersonStructOutput = [
    name: string,
    citizenshipCardId: string,
    birthdate: bigint
  ] & { name: string; citizenshipCardId: string; birthdate: bigint };

  export type WillCreationStruct = {
    will: string;
    isPublic: boolean;
    secretCode: string;
    testator: BlockchainWill.PersonStruct;
    firstWitness: BlockchainWill.PersonStruct;
    secondWitness: BlockchainWill.PersonStruct;
  };

  export type WillCreationStructOutput = [
    will: string,
    isPublic: boolean,
    secretCode: string,
    testator: BlockchainWill.PersonStructOutput,
    firstWitness: BlockchainWill.PersonStructOutput,
    secondWitness: BlockchainWill.PersonStructOutput
  ] & {
    will: string;
    isPublic: boolean;
    secretCode: string;
    testator: BlockchainWill.PersonStructOutput;
    firstWitness: BlockchainWill.PersonStructOutput;
    secondWitness: BlockchainWill.PersonStructOutput;
  };

  export type WillStruct = {
    will: string;
    isPublic: boolean;
    createdAt: BigNumberish;
    secretCode: string;
    testator: BlockchainWill.PersonStruct;
    firstWitness: BlockchainWill.PersonStruct;
    secondWitness: BlockchainWill.PersonStruct;
  };

  export type WillStructOutput = [
    will: string,
    isPublic: boolean,
    createdAt: bigint,
    secretCode: string,
    testator: BlockchainWill.PersonStructOutput,
    firstWitness: BlockchainWill.PersonStructOutput,
    secondWitness: BlockchainWill.PersonStructOutput
  ] & {
    will: string;
    isPublic: boolean;
    createdAt: bigint;
    secretCode: string;
    testator: BlockchainWill.PersonStructOutput;
    firstWitness: BlockchainWill.PersonStructOutput;
    secondWitness: BlockchainWill.PersonStructOutput;
  };
}

export interface BlockchainWillInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "citizenshipCardIdToAddress"
      | "citizenshipCardIdToWill"
      | "createWill"
      | "getPublicWills"
      | "getPublicWillsLength"
      | "getWill"
      | "personHasCreatedWill"
      | "publicWills"
      | "revokePrivateWill"
      | "revokePublicWill"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "citizenshipCardIdToAddress",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "citizenshipCardIdToWill",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "createWill",
    values: [BlockchainWill.WillCreationStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getPublicWills",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPublicWillsLength",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getWill", values: [string]): string;
  encodeFunctionData(
    functionFragment: "personHasCreatedWill",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "publicWills",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "revokePrivateWill",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "revokePublicWill",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "citizenshipCardIdToAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "citizenshipCardIdToWill",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "createWill", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPublicWills",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPublicWillsLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getWill", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "personHasCreatedWill",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "publicWills",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "revokePrivateWill",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "revokePublicWill",
    data: BytesLike
  ): Result;
}

export interface BlockchainWill extends BaseContract {
  connect(runner?: ContractRunner | null): BlockchainWill;
  waitForDeployment(): Promise<this>;

  interface: BlockchainWillInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  citizenshipCardIdToAddress: TypedContractMethod<
    [arg0: string],
    [string],
    "view"
  >;

  citizenshipCardIdToWill: TypedContractMethod<
    [arg0: string],
    [
      [
        string,
        boolean,
        bigint,
        string,
        BlockchainWill.PersonStructOutput,
        BlockchainWill.PersonStructOutput,
        BlockchainWill.PersonStructOutput
      ] & {
        will: string;
        isPublic: boolean;
        createdAt: bigint;
        secretCode: string;
        testator: BlockchainWill.PersonStructOutput;
        firstWitness: BlockchainWill.PersonStructOutput;
        secondWitness: BlockchainWill.PersonStructOutput;
      }
    ],
    "view"
  >;

  createWill: TypedContractMethod<
    [_will: BlockchainWill.WillCreationStruct],
    [void],
    "nonpayable"
  >;

  getPublicWills: TypedContractMethod<
    [],
    [BlockchainWill.WillStructOutput[]],
    "view"
  >;

  getPublicWillsLength: TypedContractMethod<[], [bigint], "view">;

  getWill: TypedContractMethod<
    [_testatorCitizenshipCardId: string],
    [BlockchainWill.WillStructOutput],
    "view"
  >;

  personHasCreatedWill: TypedContractMethod<[arg0: string], [boolean], "view">;

  publicWills: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        string,
        boolean,
        bigint,
        string,
        BlockchainWill.PersonStructOutput,
        BlockchainWill.PersonStructOutput,
        BlockchainWill.PersonStructOutput
      ] & {
        will: string;
        isPublic: boolean;
        createdAt: bigint;
        secretCode: string;
        testator: BlockchainWill.PersonStructOutput;
        firstWitness: BlockchainWill.PersonStructOutput;
        secondWitness: BlockchainWill.PersonStructOutput;
      }
    ],
    "view"
  >;

  revokePrivateWill: TypedContractMethod<
    [_testatorCitizenshipCardId: string],
    [void],
    "nonpayable"
  >;

  revokePublicWill: TypedContractMethod<
    [_testatorCitizenshipCardId: string],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "citizenshipCardIdToAddress"
  ): TypedContractMethod<[arg0: string], [string], "view">;
  getFunction(
    nameOrSignature: "citizenshipCardIdToWill"
  ): TypedContractMethod<
    [arg0: string],
    [
      [
        string,
        boolean,
        bigint,
        string,
        BlockchainWill.PersonStructOutput,
        BlockchainWill.PersonStructOutput,
        BlockchainWill.PersonStructOutput
      ] & {
        will: string;
        isPublic: boolean;
        createdAt: bigint;
        secretCode: string;
        testator: BlockchainWill.PersonStructOutput;
        firstWitness: BlockchainWill.PersonStructOutput;
        secondWitness: BlockchainWill.PersonStructOutput;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "createWill"
  ): TypedContractMethod<
    [_will: BlockchainWill.WillCreationStruct],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getPublicWills"
  ): TypedContractMethod<[], [BlockchainWill.WillStructOutput[]], "view">;
  getFunction(
    nameOrSignature: "getPublicWillsLength"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getWill"
  ): TypedContractMethod<
    [_testatorCitizenshipCardId: string],
    [BlockchainWill.WillStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "personHasCreatedWill"
  ): TypedContractMethod<[arg0: string], [boolean], "view">;
  getFunction(
    nameOrSignature: "publicWills"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        string,
        boolean,
        bigint,
        string,
        BlockchainWill.PersonStructOutput,
        BlockchainWill.PersonStructOutput,
        BlockchainWill.PersonStructOutput
      ] & {
        will: string;
        isPublic: boolean;
        createdAt: bigint;
        secretCode: string;
        testator: BlockchainWill.PersonStructOutput;
        firstWitness: BlockchainWill.PersonStructOutput;
        secondWitness: BlockchainWill.PersonStructOutput;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "revokePrivateWill"
  ): TypedContractMethod<
    [_testatorCitizenshipCardId: string],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "revokePublicWill"
  ): TypedContractMethod<
    [_testatorCitizenshipCardId: string],
    [void],
    "nonpayable"
  >;

  filters: {};
}
