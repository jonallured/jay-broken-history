require "thor"

module Jay
  class CLI < Thor
    include Thor::Actions

    desc "version", "Print the version"
    def version
      say Jay::VERSION
    end

    desc "nuke", "Remove all traces of a git branch"
    def nuke(branch_name)
      say "Nuking #{branch_name}..."
      run "git branch -D #{branch_name}"
    end

    def self.basename
      "jay"
    end

    def self.exit_on_failure?
      true
    end
  end
end
