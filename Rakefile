# require "rubygems"
# require 'bundler/setup'

# Bundler.require(:default)

$LOAD_PATH.unshift(File.dirname(__FILE__) + '/lib')

require 'rake/testtask'
Rake::TestTask.new do |t|
  t.libs << 'lib'
  t.verbose = true
end

require 'sinatra'
require 'app'

task :dev do
  ENV['RACK-ENV'] = 'development'
  require 'app'
  App.run!
end

task :prod do
  ENV['RACK-ENV'] = 'production'
  App.run!
end