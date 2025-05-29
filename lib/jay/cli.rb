require "thor"

module Jay
  class CLI < Thor
    desc "version", "Print the version"
    def version
      say Jay::VERSION
    end

    def self.basename
      "jay"
    end

    def self.exit_on_failure?
      true
    end
  end
end
