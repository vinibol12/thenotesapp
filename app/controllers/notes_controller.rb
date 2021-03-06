class NotesController < ApplicationController

  def index

    notes = Note.where user_id: current_user.id

    notes_trimmed = []

    for x in 0..notes.length-1
      note = notes[x]
      notes_trimmed << {title: note.title, body: note.body, id: note.id, uptdated_at: note.updated_at, created_at: note.created_at}
      if x == notes.length-1
        puts notes_trimmed
      end

    end
    notes_trimmed = notes_trimmed.sort_by{|item| item['title']}

    respond_with notes_trimmed

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
