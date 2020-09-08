import Raw from "../../../src/commands/keys/raw"
import { mockKeysHelper } from "../../helpers"

describe("Raw", () => {
  it("adds raw key and then updates", async () => {
    const mockAddRawKey = mockKeysHelper("addRawKey")
    const mockUpdateKeys = mockKeysHelper("updateKeys")
    await Raw.run([])
    expect(mockAddRawKey).toHaveBeenCalled()
    expect(mockUpdateKeys).toHaveBeenCalled()
  })
})
