class DomainSerializer < ActiveModel::Serializer
  attributes :id, :name, :url, :events_list

  def events_list
    events = object.events.group(:name).count
    events.map { |event_name, count| {event_name: event_name, count: count} }
  end
end
