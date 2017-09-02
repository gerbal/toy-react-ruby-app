require "minitest/autorun"
require 'byebug'
require 'app'


class TestApp < Minitest::Test
  def setup
    @app = App.new!
  end

  def test_loading_and_parsing_sample_data
    refute_empty @app.sample_data
    assert_equal "jdoe@babbel.com", @app.sample_data["John Doe"]
  end

  def test_first_initial_last_name
    name = "Greg Smith"
    domain = "google.com"
    assert_equal 'gsmith@google.com', @app.first_initial_last_name(name, domain)
  end

  def test_first_name_last_name
    name = "Greg Smith"
    domain = "google.com"
    assert_equal 'gregsmith@google.com', @app.first_name_last_name(name, domain)
  end

  def test_infer_rules
    rules = @app.infer_rules

    assert_equal :first_initial_last_name, rules['babbel.com']
    assert_equal :first_name_last_name, rules['google.com']
    assert_equal :unknown_rule, rules['linkedin.com']
  end

  def test_compute_email
    assert_equal 'gregsmith@google.com', @app.compute_email('Greg Smith', 'google.com')
    assert_equal 'tpowell@babbel.com', @app.compute_email('Thom Powell', 'babbel.com')
    assert_equal   "Unknown domain. Try jkirk@microsoft.com or jaredkirk@microsoft.com?",
       @app.compute_email('Jared Kirk', 'microsoft.com')
  end
end