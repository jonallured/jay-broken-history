require "jay/cli"

RSpec.describe Jay::CLI do
  context "with no arguments" do
    let(:argument_vector) { [] }

    it "prints the help text" do
      expected_output = File.read("spec/fixtures/cli/help.txt")
      expect do
        Jay::CLI.start(argument_vector)
      end.to output(expected_output).to_stdout
    end
  end

  context "with version command" do
    let(:argument_vector) { ["version"] }

    it "prints the version" do
      expected_output = Jay::VERSION + "\n"
      expect do
        Jay::CLI.start(argument_vector)
      end.to output(expected_output).to_stdout
    end
  end

  context "with nuke command" do
    let(:argument_vector) { ["nuke", "test-branch"] }

    it "deletes the branch" do
      expected_output = "Nuking test-branch...\n         run  echo hi from \".\"\n"
      expect do
        Jay::CLI.start(argument_vector)
      end.to output(expected_output).to_stdout
    end
  end
end
