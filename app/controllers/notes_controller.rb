class NotesController < ApplicationController

  def index
    respond_with Note.all
  end

  def create
    respond_with Note.create(notes_params)
  end

  def show
    respond_with Note.find(params[:id])
  end

  def update
    respond_with Note.update( params[:id], notes_params)
  end

  def destroy
    respond_with Note.destroy(params[:id])
  end

  private
  def notes_params
    params.require(:note).permit(:title, :body)
  end


end
