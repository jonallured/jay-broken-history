require "thor"

module Jay
  class CLI < Thor
    def self.basename
      "jay"
    end

    def self.exit_on_failure?
      true
    end
  end
end
