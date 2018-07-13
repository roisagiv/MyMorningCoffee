# frozen_string_literal: true

source "https://rubygems.org"

git_source(:github) { |repo_name| "https://github.com/#{repo_name}" }

gem "cocoapods", "1.5.3"

# Added at 2018-07-14 12:54:05 +0300 by roisagiv:
gem "fastlane", "2.99.1"

plugins_path = File.join(File.dirname(__FILE__), "ios", "fastlane", "Pluginfile")
eval_gemfile(plugins_path) if File.exist?(plugins_path)
