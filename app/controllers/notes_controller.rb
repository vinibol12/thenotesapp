class NotesController < ApplicationController

  def index

    notes = Note.where user_id: current_user.id

    notes_trimmed = []

    for x in 0..notes.length-1
      note = notes[x]
      notes_trimmed << {title: note.title, body: note.body, id: note.id}
    end
    # responding with only the necessary attributes of each note to the front end.
    respond_with notes_trimmed



    # current_user_notes = notes.where(user_id: current_user.id)
    #
    # respond_with current_user_notes


  end

  def create
    respond_with Note.create(notes_params.merge(user_id: current_user.id))
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
