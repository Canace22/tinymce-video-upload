import Plugin from '../../main/ts/Plugin';
// import uploadVideo from './upload'

declare let tinymce: any;

Plugin();

tinymce.init({
  selector: "textarea.tinymce",
  plugins: "code video-upload",
  toolbar: "video-upload",
  media_live_embeds: true,
  file_picker_callback(callback, value, meta) {
    if (meta.filetype === "media") {
      callback('')
    }
  },
});
