#!/usr/bin/env ruby
require "yaml"
require "tilt"
require "slim"
require "json"

Slim::Engine.set_default_options :pretty => true

t = Tilt.new "assets/index.slim"
f = File.new "index.html", "w+"
f.write(t.render())
f.close

if false
  files = Dir.glob "config/*.yaml"
  files.each do |file|
    file = file.gsub(".yaml", "")
    out = file.gsub("config/", "")
    f = File.open "#{file}.yaml", "r"
    o = File.open "#{out}.json", "w"
    o.write(YAML::load(f.read).to_json)
    f.close
    o.close
  end
end

`coffee -cbo javascripts assets/*.coffee`

puts 'enter commit message: '

message = gets.strip.chomp
`git add .
git commit -m '#{message}'
git push origin master
git branch -d gh-pages
git branch gh-pages
git push origin gh-pages`