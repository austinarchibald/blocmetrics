class HomeController < ApplicationController
  before_action :go_to_ember

  def index
  end

  protected

  def go_to_ember
    redirect_to "/ember" if current_user && controller_name != "ember"
  end
end
