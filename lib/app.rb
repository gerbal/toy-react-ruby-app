require 'sinatra'
require 'sinatra/json'

require 'json'

class App < Sinatra::Base
  set :root, 'lib/app'

  configure do
    enable :logging
  end

  before do
    headers 'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Headers' => 'Origin, X-Requested-With, Content-Type, Accept, AUTHORIZATION, API-TOKEN',
            'Access-Control-Allow-Methods' => 'GET, POST, PUT, PATCH, DELETE, OPTIONS, LINK, UNLINK',
            'Access-Control-Max-Age' => '60',
            'Accept' => 'application/json'

    if request.options?
      halt 204
    end
  end

  get '/' do
    render :html, :index
  end

  get '/email' do
    name = params['name']
    domain = params['domain']
    json({email: compute_email(name, domain) })
  end

  def initialize
    @ruleset = infer_rules
    super
  end

  def compute_email(name, domain)
    rule = @ruleset[domain] || :unknown_rule
    self.send(rule, name, domain.strip)
  end

  def sample_data
    @sample_data ||= JSON.parse(File.read('lib/sample-data.json'))
  end

  def infer_rules
    sample_data.map do |name, email|
      domain = email.split('@').last.strip
      if email == first_initial_last_name(name, domain)
        [domain, :first_initial_last_name]
      elsif email == first_name_last_name(name, domain)
        [domain, :first_name_last_name]
      else
        [domain, :unknown_rule]
      end
    end.to_h
  end

  def first_initial_last_name(name, domain)
    if name.split(' ').length <=1
      return first_name_last_name(name, domain)
    end

    first_initial = name.slice(0)
    last_name = name.split(' ').last
    "#{first_initial}#{last_name}@#{domain}".downcase
  end

  def first_name_last_name(name, domain)
    formatted_name = name.gsub(/\W+/, '')
    "#{formatted_name}@#{domain}".downcase
  end

  def unknown_rule(name, domain)
    "Unknown Domain"
  end
end
