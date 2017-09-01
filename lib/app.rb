require 'sinatra'
require 'sinatra/json'
require "sinatra/reloader" if development?
require 'sinatra/cross_origin'


class App < Sinatra::Base
  register Sinatra::CrossOrigin

  set :root, 'lib/app'

  configure do
    enable :cross_origin
    enable :logging    
  end

  options "*" do
    response.headers["Allow"] = "HEAD,GET,PUT,POST,DELETE,OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Cache-Control, Accept"
    200
  end

  get '/' do 
    render :html, :index
  end

  get '/email' do
    name = params['name']
    domain = params['domain']
    json({email: "#{name}@#{domain}" })
  end
end