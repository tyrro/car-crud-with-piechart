module Queries
  class Paginate < Queries::Base
    def call
      @relation.page(@params[:page]).per(10)
    end
  end
end
