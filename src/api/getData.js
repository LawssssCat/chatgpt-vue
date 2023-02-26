import base from './index'
let axios = base.axios
let baseUrl = base.baseUrl

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.VUE_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generate(params) {
  if (!configuration.apiKey) {
    return {
      error: {
        text: "OpenAI API key not configured, please follow instructions in README.md"
      }
    }
  }
  try {
    const completion = await openai.createCompletion(params);
    return completion.data;
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return {
        error: {
          test: error.response.data
        }
      };
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return {
        error: {
          message: 'An error occurred during your request.',
        }
      };
    }
  }
}

// 获取好友
export const getFriend = params => {
    return axios({
      method: 'post',
      baseURL: `${baseUrl}/friend/friendList`,
      data: params
    }).then(res => res.data)
  }

  // 获取聊天信息
export const getChatMsg = params => {
  return axios({
    method: 'post',
    baseURL: `${baseUrl}/friend/chatMsg`,
    data: params
  }).then(res => res.data)
}

// 获取聊天信息
export const chatgpt = params => {
  return generate(params);
}
