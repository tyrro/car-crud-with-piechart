class ImportCsv
  include Interactor

  delegate :importer, :params, to: :context

  def call
    return context.message = I18n.t('import.choose_file') unless params[:file].present?

    result = importer.call(params[:file])
    if result[:success]
      context.message = I18n.t('import.successful')
    else
      context.errors = result[:errors]
      context.fail!
    end
  end
end
