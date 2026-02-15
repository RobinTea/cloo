# CLOO

The **GOAL** of this project is to improve my frontend and backend skills.

## what
CLOO is a fictional drink shop that I plan to host on a raspberry pi or similar to gain more backend and frontend experience.

<img height="400" alt="image" src="https://github.com/user-attachments/assets/19417d29-f3b8-4842-b87e-845673a3d256" />

## why
why drinks? its easy to model in blender, its just a tube (cylinder) after all.

I always wanted to make something shop-like.
It's difficult to explain but I'm magicaly drawn to it.

## notes
cloo comes from clue, cause in the beginning, I didn't have much of a clue before (way better now).
but thinking now, the name could have originated from "cool"...

for an easier beginning I asked copilot for a template/Prototype -> it was meh -> I had a lot of work to do

anyway, while developing I noticed that you need to make things like the header (navbar) multiple times in multiple files. I understand now why people love component based tools.
I had another repo with a template, but angular was to complicated for me as a beginner and I had difficult times to understand it. thats why I switched to vanilla html,css and js.
at the moment I save the things in local storage and run it locally but plan to host it somewhere (maby on a raspberry).   


---

thanks to [sleepz](https://github.com/sleepz103) for helping me understand the theoretical part (Backend) better.

other experiences I learned:
- I personally cant work with one single style.css file -> I need multiple
- asking ai for a beginning "can" save alot of time if its simple, else you will debug for a very long time and spend alot with understanding the code.
- too use variables for colors draws pro and cons with it
- cause of my animation at the beginning I wanted smooth scrolling. mine was meh so i used [lenis](https://lenis.darkroom.engineering/)
- using a lot of effects uses a lot of ressources, which is why optimizing is so important -> switched from noise generator to using a texture / using webp for the home animation instead of mp4 removing the need to calculate the position every frame.
