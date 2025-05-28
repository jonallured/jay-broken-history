require "thor"

module Jay
  class CLI < Thor
    def self.exit_on_failure?
      true
    end

    def self.basename
      "jay"
    end
  end
end