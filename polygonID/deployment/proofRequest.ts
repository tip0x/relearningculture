// Imports
// ========================================================
/**
 * This represents a template base that will be modified as needed in htmlQRClaim/src/App.tsx
 */
const proofRequest = {
    // 1. UUID for the request
    // - can be anything UUID
    "id": "c811849d-6bfb-4d85-936e-3d9759c7f105",
    // 2. Content type used by the Polygon ID wallet
    // - needs to be constant / does not change
    "typ": "application/iden3comm-plain-json",
    // 3. ?
    "type": "https://iden3-communication.io/proofs/1.0/contract-invoke-request",
    // 4. Payload to send for proof request
    "body": {
        // Function to be executed from the contract for the zk response
        "transaction_data": {
            // - deployed contract address where it will call a specific function
            // <CHANGE THIS>
            "contract_address": "0xA08fAA759Dc286611e6a1c42c857F6022A7bbcf0",
            // - hash of the function name from the ABI - b68967e2 = submitZKPResponse
            "method_id": "b68967e2",
            // - chain id of the network
            "chain_id": 80001,
            // - network name
            "network": "polygon-mumbai"
        },
        // Reason for the request
        // - Unknown if used or not
        "reason": "airdrop participation",
        // Scope of request and information required
        // - Currently only supports a single array request
        "scope": [
            {
                // - random integer id of the scope
                "id": 1,
                // - type of request currently supports `credentialAtomicQuerySig` and `credentialAtomicQueryMTP` (not currently used)
                "circuit_id": "credentialAtomicQuerySig",
                // - conditions of the request
                "rules": {
                    // - only accepts query
                    "query": {
                        // - whitelist of polygon ID platform identifier
                        "allowed_issuers": [
                            "*"
                        ],
                        // - conditions to be met with zk-query-language - see https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/
                        "req": {
                            "VerifiedPerson": {
                                // NOTE: this value needs to match the erc20ZkpRequest.ts L34 or erc721ZkpRequest.ts L34
                                "$eq": 1
                            }
                        },
                        // - schema of the proof and type, type is case-sensitive
                        // <CHANGE THIS>
                        "schema": {
                            "url": "https://s3.eu-west-1.amazonaws.com/polygonid-schemas/8826487d-8195-4b51-a926-cb4783835dd3.json-ld", 
                            "type": "ProofofExistence"
                        }
                    }
                }
            }
        ]
    }
};

// Exports
// ========================================================
export default proofRequest;