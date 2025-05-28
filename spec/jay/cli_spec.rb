require "jay/cli"

RSpec.describe Jay::CLI do
  context "with no arguments" do
    let(:argument_vector) { [] }
    
    it "outputs the help text" do
      expected_output = File.read("spec/fixtures/cli_output.txt")
  
      expect do
        Jay::CLI.start(argument_vector)
      end.to output(expected_output).to_stdout
    end
  end
end