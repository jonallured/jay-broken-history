require "jay/cli"

RSpec.describe Jay::CLI do
  it "has help" do
    argument_vector = []
    expected_output = File.read("spec/fixtures/cli/help.txt")
    expect do
      Jay::CLI.start(argument_vector)
    end.to output(expected_output).to_stdout
  end
end
