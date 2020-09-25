module Queries
  class Search < Queries::Base
    def call
      return @relation unless @params[:q]

      @relation.search(@params[:q])
    end
  end
end
