EmberCLI.configure do |c|
  c.app :frontend, path: Rails.root.join('frontend').to_s
end

#For your Ember application, I suggest changing the app to something like :rails_root/frontend. Adding to the app directory will impact your performance in development mode, because Rails will track all files for auto-loading, even though this won’t be used