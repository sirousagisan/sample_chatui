from transformers import AutoModelForCausalLM, AutoTokenizer, TextIteratorStreamer
from threading import Thread
import asyncio

# 軽めのモデルで検証
model_name = "rinna/japanese-gpt2-small"
tknz = AutoTokenizer.from_pretrained(model_name, legacy=False)
model = AutoModelForCausalLM.from_pretrained(model_name)

async def get_res(text):
    inputs = tknz([text], return_tensors="pt")
    streamer = TextIteratorStreamer(tknz, skip_prompt=True)
    generation_kwargs = dict(inputs, streamer=streamer, max_new_tokens=80)
    thread = Thread(target=model.generate, kwargs=generation_kwargs)
    thread.start()
    generated_text = ""
    for new_text in streamer:
        generated_text += new_text
        await asyncio.sleep(0)
        yield generated_text

# get_res("こんにちは")