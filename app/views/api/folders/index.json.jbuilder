@folders.each do |folder|
    json.set! folder.id do
        json.partial! 'api/folders/folder', folder: folder
    end
end