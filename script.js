const Version = {
    jsonrpc: "2.0",
    method: "generateIntegers",
};

const Values = {
    "apiKey": "dd69c818-5d2e-4144-9a9c-3a03afa2cd58",
    "n": 1,
    "min": 1,
    "max": 6
};

let request = {
    method: "POST",
    body: JSON.stringify(
        {
            "jsonrpc": Version.jsonrpc,
            "method": Version.method,
            "id": "JohnyDeep",
            "params": Values,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }
    )
};
const url = "https://api.random.org/json-rpc/1/invoke";

HttpCodes = {
    success: 200,
    notFound: 404
};

getImageSrc = function (number) {
    return "img" + "/" + number + ".png"
};

addImage = function (number) {
    document.getElementById("dice").innerHTML = "";
    let img = document.createElement("img");
    img.src = getImageSrc(number);
    let src = document.getElementById("dice");
    src.appendChild(img);
};

async function search() {
    await fetch(url, request)
        .then(async resp => {
            if (resp.status === HttpCodes.success) {
                return resp.json();
            } else {
                return Promise.reject(resp);
            }
        })
        .then(body => {
            let number = body.result.random.data[0];
            addImage(number)
        })
        .catch(error => {
            if (error.status === HttpCodes.notFound) {
                let notFound = "The server can not find requested resource";
                document.getElementById("dice").innerHTML = notFound + error.status;
            }
        });
}

