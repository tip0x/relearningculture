/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "ERC20Burnable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Burnable__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "ICircuitValidator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ICircuitValidator__factory>;
    getContractFactory(
      name: "IZKPVerifier",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IZKPVerifier__factory>;
    getContractFactory(
      name: "PrimeToadIDVerifier",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PrimeToadIDVerifier__factory>;
    getContractFactory(
      name: "PTTVerifier",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PTTVerifier__factory>;
    getContractFactory(
      name: "ZKPVerifier",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ZKPVerifier__factory>;

    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "ERC20Burnable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Burnable>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "ICircuitValidator",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ICircuitValidator>;
    getContractAt(
      name: "IZKPVerifier",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IZKPVerifier>;
    getContractAt(
      name: "PrimeToadIDVerifier",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PrimeToadIDVerifier>;
    getContractAt(
      name: "PTTVerifier",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PTTVerifier>;
    getContractAt(
      name: "ZKPVerifier",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ZKPVerifier>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
