function getQiniuToken(fileExt, callback) {
  const url = `${process.env.tokenApi}?F_file_ext=${fileExt}`;
  const xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);

  // eslint-disable-next-line func-names
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      callback(JSON.parse(xhr.response));
    }
  };

  xhr.send(null);
}

function getUrl(formdata, callback) {
  const xhr = new XMLHttpRequest();

  xhr.open("POST", process.env.qiniuUrl, true);

  // eslint-disable-next-line func-names
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      callback(JSON.parse(xhr.response));
    }
  };

  xhr.send(formdata);
}

export default function uploadVideo(api) {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.onchange = function () {
    api.block("上传中……");
    const file = this.files[0];
    const temp = file.name.split(".");
    const fileExt = temp[temp.length - 1];

    const getToken = (resp) => {
      const token = resp.F_token;

      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append("token", token);

      getUrl(formdata, (res) => {
        api.setData({
          dimensions: {
            width: "300",
            height: "150",
          },
          source: {
            value: res.url,
            meta: {},
          },
        });
        if (res?.url) {
          api.unblock();
        }
      });
    };
    getQiniuToken(fileExt, getToken);
  };
  input.click();
}
