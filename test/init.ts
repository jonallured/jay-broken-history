import { JayConfig } from "../src/shared/JayConfig"
import * as keysHelpers from "../src/helpers/keys"

JayConfig.init()

export type KeysHelpersName = keyof typeof keysHelpers

export const mockKeysHelper = (helperName: KeysHelpersName): jest.Mock => {
  const mockHelper = jest.fn()
  jest.spyOn(keysHelpers, helperName).mockImplementation(mockHelper)
  return mockHelper
}
