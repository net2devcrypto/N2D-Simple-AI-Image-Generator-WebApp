const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const app = express();
const cors=require("cors");
const corsOptions ={
    origin:'*', 
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions))
app.use(require('body-parser').json());

const { stablekey, openaikey } = require('./key');
const configuration = new Configuration({
  apiKey: openaikey,
});
const openai = new OpenAIApi(configuration);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


const n2dlogo = `
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▀█ ▄▄█▄ ▄█ ▄ █ ▄▀█ ▄▄█▀███▀
█ ██ █ ▄▄██ ███▀▄█ █ █ ▄▄██ ▀ █
█▄██▄█▄▄▄██▄██ ▀▀█▄▄██▄▄▄███▄██
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
`

async function generateCustom(prompt, aimodel) {
  const options = {
    method: "POST",
    body: JSON.stringify({
      key: stablekey,
      model_id: aimodel,
      prompt: prompt,
      negative_prompt:
        "((out of frame)), ((extra fingers)), mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), (((tiling))), ((naked)), ((tile)), ((fleshpile)), ((ugly)), (((abstract))), blurry, ((bad anatomy)), ((bad proportions)), ((extra limbs)), cloned face, (((skinny))), glitchy, ((extra breasts)), ((double torso)), ((extra arms)), ((extra hands)), ((mangled fingers)), ((missing breasts)), (missing lips), ((ugly face)), ((fat)), ((extra legs)), anime",
      width: "768",
      height: "1024",
      samples: 1,
      num_inference_steps: "30",
      safety_checker: "no",
      enhance_prompt: "yes",
      seed: null,
      guidance_scale: 10,
      webhook: null,
      track_id: null,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    "https://stablediffusionapi.com/api/v4/dreambooth",
    options
  );
  const result = await response.json();
  console.log('Image Generated!')
  return result.output[0];
}

  async function generateStable(prompt) {
    const options = {
      method: "POST",
      body: JSON.stringify({
        key: stablekey,
        prompt: prompt,
        negative_prompt:
          "((out of frame)), ((extra fingers)), mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), (((tiling))), ((naked)), ((tile)), ((fleshpile)), ((ugly)), (((abstract))), blurry, ((bad anatomy)), ((bad proportions)), ((extra limbs)), cloned face, (((skinny))), glitchy, ((extra breasts)), ((double torso)), ((extra arms)), ((extra hands)), ((mangled fingers)), ((missing breasts)), (missing lips), ((ugly face)), ((fat)), ((extra legs)), anime",
        width: "768",
        height: "1024",
        samples: 1,
        num_inference_steps: "30",
        safety_checker: "no",
        enhance_prompt: "yes",
        seed: null,
        guidance_scale: 10,
        webhook: null,
        track_id: null,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

  const response = await fetch(
    "https://stablediffusionapi.com/api/v3/text2img",
    options
  );
  const result = await response.json();
  const data = result.output[0];
  const array = [];
  if (data != undefined) {
    array.push(data);
  }
  else if (data == undefined) {
  const etaraw = Number(((result.eta).toString()).split('.')[0]);
  const etamilisec = etaraw * 1500;
  console.log('Estimated duration ' + etaraw + " seconds")
  const imagepath = result.fetch_result;
  await delay(etamilisec);
  const options = {
    method: "POST",
    body: JSON.stringify({
      key: stablekey,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response2 = await fetch(imagepath, options);
  const fetched = await response2.json();
  const imageout = fetched.output[0];
  array.push(imageout);
  }
  await delay(2000);
  const image = array[0];
  console.log('Image Generated!')
  return image;
}


 async function generateDallE(prompt) {
  let data = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "512x512",
  });
  console.log('Image Generated!')
  return data.data.data[0].url;
 }


app.post("/generatecustom", function (req, res) {
    const prompt = req.body.prompt;
    const aimodel = req.body.aimodel;
    return new Promise((resolve, reject) => {
      generateCustom(prompt, aimodel)
        .then((response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.setHeader("Cache-Control", "max-age=180000");
          res.end(JSON.stringify(response));
          resolve();
        })
        .catch((error) => {
          res.json(error);
          res.status(405).end();
        });
    });
  });

  app.post("/generatestable", function (req, res) {
    const prompt = req.body.prompt;
    return new Promise((resolve, reject) => {
      generateStable(prompt)
        .then((response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.setHeader("Cache-Control", "max-age=180000");
          res.end(JSON.stringify(response));
          resolve();
        })
        .catch((error) => {
          res.json(error);
          res.status(405).end();
        });
    });
  });

  app.post("/generatedalle", function (req, res) {
    const prompt = req.body.prompt;
    return new Promise((resolve, reject) => {
      generateDallE(prompt)
        .then((response) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.setHeader("Cache-Control", "max-age=180000");
          res.end(JSON.stringify(response));
          resolve();
        })
        .catch((error) => {
          res.json(error);
          res.status(405).end();
        });
    });
  });

  const server = app.listen(8082, function () {
    const port = server.address().port;
    console.log(n2dlogo);
    console.log('');
    console.log('');
    console.log("Backend API listening over port: " + port);
  });
