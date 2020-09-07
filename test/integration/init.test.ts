import { initKeys } from "../../src/helpers/keys"
import { JayConfig } from "../../src/shared/JayConfig"
import { JayUtils } from "../../src/shared/JayUtils"
import { captureStructure, root } from "../helpers"

const computePath = (testFolder: string): string => {
  const fixtureFolder = "tmp/test/integration/fixtures"
  const path = [root, fixtureFolder, testFolder].join("/")
  return path
}

beforeAll(() => {
  const rmCommand = "rm -rf tmp/test"
  const mkdirCommand = "mkdir -p tmp/test/integration"
  const cpCommand = "cp -R test/integration/fixtures tmp/test/integration"
  const commands = [rmCommand, mkdirCommand, cpCommand].join(" && ")
  JayUtils.exec(commands)
})

describe("initializing", () => {
  describe("with no existing authorized keys file", () => {
    it("sets up an initial keys structure", () => {
      const path = computePath("no-existing")
      const config = new JayConfig(path)
      initKeys(config)
      const structure = captureStructure(path)
      expect(structure).toMatchSnapshot()
    })
  })

  describe("with an empty existing authorized keys file", () => {
    it("sets up an initial keys structure", () => {
      const path = computePath("empty-existing")
      const config = new JayConfig(path)
      initKeys(config)
      const structure = captureStructure(path)
      expect(structure).toMatchSnapshot()
    })
  })

  describe("with some existing authorized keys", () => {
    it("setups up an inital keys structure and honors those existing keys", () => {
      const path = computePath("some-existing")
      const config = new JayConfig(path)
      initKeys(config)
      const structure = captureStructure(path)
      expect(structure).toMatchSnapshot()
    })
  })

  describe("with an already setup keys structure", () => {
    it("does nothing", () => {
      const path = computePath("already-setup")
      const config = new JayConfig(path)
      initKeys(config)
      const structure = captureStructure(path)
      expect(structure).toMatchSnapshot()
    })
  })
})
