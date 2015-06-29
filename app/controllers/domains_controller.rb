class DomainsController < ApplicationController

  respond_to :json

  def index
    @domains = current_user.domains.all
    @new_domain = Domain.new
    respond_with @domains
  end

  def show
    @user = current_user
    @domain = @user.domains.find(params[:id])
    @events = @domain.events.group_by(&:name)
    respond_with @domain
  end

  def new
    @domain = Domain.new
  end

  def create
    @user = current_user
    @domain = current_user.domains.build(app_params)
    @new_domain = Domain.new
    respond_with current_user.domains.create(app_params)
  end

  def destroy
    @domain = current_user.domains.find(params[:id])
    respond_with @domain.destroy
  end

  private

  def app_params
    params.require(:domain).permit(:name, :url)
  end
end
