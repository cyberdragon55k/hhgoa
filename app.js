(function(){

const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");

const dropzone=document.getElementById("dropzone");
const fileInput=document.getElementById("fileInput");

const zoomRow=document.getElementById("zoomRow");
const zoomSlider=document.getElementById("zoom");
const zoomVal=document.getElementById("zoomVal");

const cardFields=document.getElementById("cardFields");
const bannerFields=document.getElementById("bannerFields");
const dispatchFields=document.getElementById("dispatchFields");
const crewFields=document.getElementById("crewFields");

const crewCount=document.getElementById("crewCount");

const crewName1=document.getElementById("crewName1");
const crewName2=document.getElementById("crewName2");
const crewName3=document.getElementById("crewName3");

const crewFile1=document.getElementById("crewFile1");
const crewFile2=document.getElementById("crewFile2");
const crewFile3=document.getElementById("crewFile3");

const crewGroupFile=document.getElementById("crewGroupFile");

const crewFilesAll=document.getElementById("crewFilesAll");
const crewFilesAllLabel=document.getElementById("crewFilesAllLabel");

const crewFile1Label=document.getElementById("crewFile1Label");
const crewFile2Label=document.getElementById("crewFile2Label");
const crewFile3Label=document.getElementById("crewFile3Label");
const crewGroupFileLabel=document.getElementById("crewGroupFileLabel");

const crewFile1Remove=document.getElementById("crewFile1Remove");
const crewFile2Remove=document.getElementById("crewFile2Remove");
const crewFile3Remove=document.getElementById("crewFile3Remove");
const crewGroupFileRemove=document.getElementById("crewGroupFileRemove");

const crewMembers=document.querySelectorAll(".crew-member");

const nameInput=document.getElementById("nameInput");
const roleInput=document.getElementById("roleInput");
const badgeInput=document.getElementById("badgeInput");

const builderTitleEl=document.getElementById("builderTitle");
const rerollBtn=document.getElementById("rerollBtn");

const bannerTitle=document.getElementById("bannerTitle");
const bannerSub=document.getElementById("bannerSub");
const bannerLocation=document.getElementById("bannerLocation");
const bannerDate=document.getElementById("bannerDate");
const bannerSize=document.getElementById("bannerSize");
const bannerPhotoPosition=document.getElementById("bannerPhotoPosition");
const bannerTheme=document.getElementById("bannerTheme");
const bannerFont=document.getElementById("bannerFont");
const bannerPhoto=document.getElementById("bannerPhoto");

const dispatchTitle=document.getElementById("dispatchTitle");
const dispatchMessage=document.getElementById("dispatchMessage");
const dispatchFrom=document.getElementById("dispatchFrom");
const dispatchStamp=document.getElementById("dispatchStamp");
const dispatchTheme=document.getElementById("dispatchTheme");

const hackathonFields=document.getElementById("hackathonFields");
const hackTopText=document.getElementById("hackTopText");
const hackBottomText=document.getElementById("hackBottomText");
const hackRibbon1=document.getElementById("hackRibbon1");
const hackRibbon2=document.getElementById("hackRibbon2");

const downloadBtn=document.getElementById("downloadBtn");
const shareBtn=document.getElementById("shareBtn");

const captionText=document.getElementById("captionText");
const statusEl=document.getElementById("status");

const tabs=document.querySelectorAll(".tab");


/* =====================================================
   CANVAS SIZES
===================================================== */

const PFP={
  w:1080,
  h:1080
};

const CARD={
  w:1080,
  h:1350
};

const DISPATCH={
  w:1600,
  h:1000
};

const CREW={
  w:1080,
  h:1350
};

const HACKATHON={
  w:1080,
  h:1080
};

const BANNER_SIZES={

  wide:{
    w:1500,
    h:500
  },

  social:{
    w:1600,
    h:900
  },

  hd:{
    w:1920,
    h:1080
  },

  post:{
    w:1200,
    h:628
  }

};


/* =====================================================
   COLORS
===================================================== */

const FOREST="#0B6839";
const FOREST_DEEP="#073A20";
const CREAM="#FBF3DC";
const CREAM_2="#F1E6C6";
const INK="#123422";
const PINK="#E8177A";
const PINK_DEEP="#C90F65";
const YELLOW="#F2C300";


/* =====================================================
   STATE
===================================================== */

let mode="pfp";

let img=null;

let crewImages=[
  null,
  null,
  null
];

let crewGroupImage=null;

let baseScale=1;
let scaleMult=1;

let offX=0;
let offY=0;

let dragging=false;
let dragStart=null;
let offStart=null;

let badgeNo=randomBadge();

if(badgeInput){
  badgeInput.value=badgeNo;
}


/* =====================================================
   TITLES
===================================================== */

const TITLE_ADJ=[
  "Midnight",
  "Salt-Air",
  "Papaya",
  "Palm-Line",
  "Monsoon",
  "Feni-Fueled",
  "Barefoot",
  "Tide-Chasing",
  "Late-Night",
  "Coconut",
  "Sunburnt",
  "Backwater"
];

const TITLE_NOUN=[
  "Shipper",
  "Debugger",
  "Architect",
  "Prototyper",
  "Wizard",
  "Captain",
  "Hacker",
  "Builder",
  "Tinkerer",
  "Deployer",
  "Firestarter",
  "Navigator"
];


function randomBadge(){

  return String(
    Math.floor(Math.random()*900)+100
  );

}


function rollTitle(){

  const a=
    TITLE_ADJ[
      Math.floor(
        Math.random()*TITLE_ADJ.length
      )
    ];

  const n=
    TITLE_NOUN[
      Math.floor(
        Math.random()*TITLE_NOUN.length
      )
    ];

  if(builderTitleEl){

    builderTitleEl.textContent=
      `${a} ${n}`.toUpperCase();

  }

}


rollTitle();


/* =====================================================
   BANNER SIZE
===================================================== */

function getBannerSize(){

  return (
    BANNER_SIZES[
      bannerSize?.value
    ] ||
    BANNER_SIZES.social
  );

}


/* =====================================================
   CREW FIELD VISIBILITY
===================================================== */

function updateCrewFieldsVisibility(){

  const count=
    Math.min(
      3,
      Math.max(
        1,
        Number(
          crewCount?.value||1
        )
      )
    );

  crewMembers.forEach(member=>{

    const index=
      Number(
        member.dataset.crewIndex
      );

    member.classList.toggle(
      "is-hidden",
      index>count
    );

  });

}


updateCrewFieldsVisibility();


/* =====================================================
   MODE SWITCHING
===================================================== */

tabs.forEach(tab=>{

  tab.addEventListener("click",()=>{

    tabs.forEach(item=>{
      item.classList.remove("active");
    });

    tab.classList.add("active");

    mode=tab.dataset.mode;


    if(cardFields){

      cardFields.style.display=
        mode==="card"
          ? "block"
          : "none";

    }


    if(bannerFields){

      bannerFields.style.display=
        mode==="banner"
          ? "block"
          : "none";

    }


    if(dispatchFields){

      dispatchFields.style.display=
        mode==="dispatch"
          ? "block"
          : "none";

    }


    if(crewFields){

      crewFields.style.display=
        mode==="crew"
          ? "block"
          : "none";

    }

    if(hackathonFields){
      hackathonFields.style.display=
        mode==="hackathon"
          ? "block"
          : "none";
    }


    /* CANVAS SIZE */

    if(mode==="pfp"){

      canvas.width=PFP.w;
      canvas.height=PFP.h;

    }


    if(mode==="card"){

      canvas.width=CARD.w;
      canvas.height=CARD.h;

    }


    if(mode==="banner"){

      const size=getBannerSize();

      canvas.width=size.w;
      canvas.height=size.h;

    }


    if(mode==="dispatch"){

      canvas.width=DISPATCH.w;
      canvas.height=DISPATCH.h;

    }


    if(mode==="crew"){

      canvas.width=CREW.w;
      canvas.height=CREW.h;

    }

    if(mode==="hackathon"){
      canvas.width=HACKATHON.w;
      canvas.height=HACKATHON.h;
    }


    /* NORMAL PHOTO MODES */

    if(
      img &&
      mode!=="crew"
    ){

      fitImage();

    }


    draw();
    updateCaption();

  });

});


/* =====================================================
   UPLOAD
===================================================== */

if(dropzone){

  dropzone.addEventListener(
    "click",
    ()=>{
      fileInput.click();
    }
  );


  ["dragover","dragenter"].forEach(eventName=>{

    dropzone.addEventListener(
      eventName,
      event=>{

        event.preventDefault();

        dropzone.classList.add("drag");

      }
    );

  });


  ["dragleave","drop"].forEach(eventName=>{

    dropzone.addEventListener(
      eventName,
      event=>{

        event.preventDefault();

        dropzone.classList.remove("drag");

      }
    );

  });


  dropzone.addEventListener("drop",event=>{

    if(
      event.dataTransfer.files &&
      event.dataTransfer.files[0]
    ){

      handleFile(
        event.dataTransfer.files[0]
      );

    }

  });

}


if(fileInput){

  fileInput.addEventListener("change",event=>{

    if(
      event.target.files &&
      event.target.files[0]
    ){

      handleFile(
        event.target.files[0]
      );

    }

  });

}


/* =====================================================
   CREW COLLAGE UPLOADS
===================================================== */

const CREW_FILE_LABELS=[
  crewFile1Label,
  crewFile2Label,
  crewFile3Label
];

const CREW_FILE_INPUTS=[
  crewFile1,
  crewFile2,
  crewFile3
];

const CREW_FILE_REMOVE_BTNS=[
  crewFile1Remove,
  crewFile2Remove,
  crewFile3Remove
];

const CREW_FILE_DEFAULT_TEXT=
  "Tap to choose photo";


function enableOutputButtons(){

  if(downloadBtn){

    downloadBtn.disabled=false;

  }

  if(shareBtn){

    shareBtn.disabled=false;

  }

}


function clearGroupPhoto(silent){

  crewGroupImage=null;

  if(crewGroupFile){

    crewGroupFile.value="";

  }

  if(crewGroupFileLabel){

    crewGroupFileLabel.textContent=
      "Tap to choose group photo";

    crewGroupFileLabel.classList.remove(
      "has-file"
    );

  }

  if(crewGroupFileRemove){

    crewGroupFileRemove.classList.remove(
      "is-visible"
    );

  }

  if(!silent){

    draw();

    showStatus(
      "Group photo removed — showing individual photos"
    );

  }

}


function clearCrewImage(index){

  crewImages[index]=null;

  const input=
    CREW_FILE_INPUTS[index];

  if(input){

    input.value="";

  }

  const label=
    CREW_FILE_LABELS[index];

  if(label){

    label.textContent=
      CREW_FILE_DEFAULT_TEXT;

    label.classList.remove(
      "has-file"
    );

  }

  const removeBtn=
    CREW_FILE_REMOVE_BTNS[index];

  if(removeBtn){

    removeBtn.classList.remove(
      "is-visible"
    );

  }

  draw();

  showStatus(
    `Friend ${index+1} photo removed`
  );

}


function loadCrewImage(file,index){

  if(!file)return;

  const reader=new FileReader();

  reader.onload=event=>{

    const image=new Image();

    image.onload=()=>{

      crewImages[index]=image;

      const label=
        CREW_FILE_LABELS[index];

      if(label){

        label.textContent=
          `✓ ${file.name}`;

        label.classList.add(
          "has-file"
        );

      }

      const removeBtn=
        CREW_FILE_REMOVE_BTNS[index];

      if(removeBtn){

        removeBtn.classList.add(
          "is-visible"
        );

      }


      /*
        An individual photo and a group
        photo can't both be shown at once —
        the group photo takes priority in
        drawCrew(). So uploading an
        individual photo automatically
        clears any group photo, instead of
        silently doing nothing.
      */

      if(crewGroupImage){

        clearGroupPhoto(true);

        showStatus(
          `Friend ${index+1} photo loaded — group photo cleared`
        );

      }else{

        showStatus(
          `Friend ${index+1} photo loaded`
        );

      }

      enableOutputButtons();

      draw();

    };

    image.onerror=()=>{

      showStatus(
        `Couldn't read Friend ${index+1} photo`
      );

    };

    image.src=event.target.result;

  };

  reader.readAsDataURL(file);

}


function loadCrewGroupImage(file){

  if(!file)return;

  const reader=new FileReader();

  reader.onload=event=>{

    const image=new Image();

    image.onload=()=>{

      crewGroupImage=image;

      if(crewGroupFileLabel){

        crewGroupFileLabel.textContent=
          `✓ ${file.name}`;

        crewGroupFileLabel.classList.add(
          "has-file"
        );

      }

      if(crewGroupFileRemove){

        crewGroupFileRemove.classList.add(
          "is-visible"
        );

      }

      enableOutputButtons();

      draw();

      showStatus(
        "Group photo loaded"
      );

    };

    image.onerror=()=>{

      showStatus(
        "Couldn't read group photo"
      );

    };

    image.src=event.target.result;

  };

  reader.readAsDataURL(file);

}


/* FRIEND 1 */

if(crewFile1){

  crewFile1.addEventListener(
    "change",
    event=>{

      loadCrewImage(
        event.target.files[0],
        0
      );

    }
  );

}


/* FRIEND 2 */

if(crewFile2){

  crewFile2.addEventListener(
    "change",
    event=>{

      loadCrewImage(
        event.target.files[0],
        1
      );

    }
  );

}


/* FRIEND 3 */

if(crewFile3){

  crewFile3.addEventListener(
    "change",
    event=>{

      loadCrewImage(
        event.target.files[0],
        2
      );

    }
  );

}


/* GROUP PHOTO */

if(crewGroupFile){

  crewGroupFile.addEventListener(
    "change",
    event=>{

      loadCrewGroupImage(
        event.target.files[0]
      );

    }
  );

}


/* REMOVE BUTTONS */

[
  crewFile1Remove,
  crewFile2Remove,
  crewFile3Remove
].forEach((btn,index)=>{

  if(!btn)return;

  btn.addEventListener(
    "click",
    ()=>{

      clearCrewImage(index);

    }
  );

});


if(crewGroupFileRemove){

  crewGroupFileRemove.addEventListener(
    "click",
    ()=>{

      clearGroupPhoto();

    }
  );

}


/* BULK UPLOAD — ALL 3 AT ONCE */

if(crewFilesAll){

  crewFilesAll.addEventListener(
    "change",
    event=>{

      const files=
        Array.from(
          event.target.files||[]
        ).slice(0,3);

      if(!files.length)return;


      files.forEach(
        (file,index)=>{

          loadCrewImage(file,index);

        }
      );


      if(crewFilesAllLabel){

        crewFilesAllLabel.textContent=
          files.length===1
            ?`✓ ${files[0].name}`
            :`✓ ${files.length} photos selected`;

        crewFilesAllLabel.classList.add(
          "has-file"
        );

      }


      if(crewCount){

        crewCount.value=
          String(
            Math.min(
              3,
              Math.max(
                files.length,
                Number(crewCount.value||1)
              )
            )
          );

        updateCrewFieldsVisibility();

      }

    }
  );

}


/* =====================================================
   HEIC
===================================================== */

let heic2anyLoader=null;


function loadHeic2Any(){

  if(window.heic2any){

    return Promise.resolve(
      window.heic2any
    );

  }


  if(heic2anyLoader){

    return heic2anyLoader;

  }


  heic2anyLoader=
    new Promise((resolve,reject)=>{

      const script=
        document.createElement("script");

      script.src=
        "https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js";


      script.onload=()=>{

        window.heic2any
          ? resolve(window.heic2any)
          : reject(
              new Error(
                "heic2any unavailable"
              )
            );

      };


      script.onerror=()=>{

        reject(
          new Error(
            "HEIC converter failed"
          )
        );

      };


      document.head.appendChild(script);

    });


  return heic2anyLoader;

}


function readAsDataURL(blob){

  return new Promise(
    (resolve,reject)=>{

      const reader=
        new FileReader();

      reader.onload=()=>
        resolve(reader.result);

      reader.onerror=()=>
        reject(reader.error);

      reader.readAsDataURL(blob);

    }
  );

}


async function handleFile(file){

  let blob=file;

  const isHeic=
    /heic|heif/i.test(file.type) ||
    /\.hei[cf]$/i.test(file.name);


  if(isHeic){

    try{

      showStatus("Converting HEIC…");

      const converter=
        await loadHeic2Any();

      blob=
        await converter({
          blob:file,
          toType:"image/jpeg",
          quality:.92
        });

    }catch(error){

      showStatus(
        "HEIC conversion failed"
      );

    }

  }


  let dataUrl;


  try{

    dataUrl=
      await readAsDataURL(blob);

  }catch(error){

    showStatus(
      "Couldn't read that photo"
    );

    return;

  }


  const image=
    new Image();


  image.onload=()=>{

    img=image;

    fitImage();

    if(zoomRow){

      zoomRow.style.display="block";

    }

    enableOutputButtons();

    draw();

    showStatus("Photo loaded");

  };


  image.onerror=()=>{

    showStatus(
      isHeic
        ?"Try JPG or PNG for this browser"
        :"Couldn't read that photo"
    );

  };


  image.src=dataUrl;

}


/* =====================================================
   IMAGE WELL
===================================================== */

function well(){

  if(mode==="pfp"){

    return{

      cx:PFP.w/2,
      cy:PFP.h/2,
      w:PFP.w*.8,
      h:PFP.h*.8,
      r:PFP.w*.4

    };

  }


  if(mode==="card"){

    const size=CARD.w*.78;

    return{

      cx:CARD.w/2,
      cy:210+size/2,
      w:size,
      h:size,
      r:30

    };

  }


  if(mode==="banner"){

    const size=getBannerSize();

    const photoSize=
      Math.min(
        size.h*.70,
        size.w*.34
      );

    const x=
      bannerPhotoPosition?.value==="left"
        ?size.w*.06
        :size.w-photoSize-size.w*.06;

    return{

      cx:x+photoSize/2,
      cy:size.h/2,
      w:photoSize,
      h:photoSize,
      r:10

    };

  }


  if(mode==="crew"){

    return{

      cx:CREW.w/2,
      cy:CREW.h*.45,
      w:CREW.w*.72,
      h:CREW.h*.55,
      r:20

    };

  }


  if(mode==="dispatch"){

    return{

      cx:DISPATCH.w*.75,
      cy:DISPATCH.h*.52,
      w:DISPATCH.w*.34,
      h:DISPATCH.h*.48,
      r:4

    };

  }

  if(mode==="hackathon"){
    return{
      cx:HACKATHON.w/2,
      cy:HACKATHON.h/2,
      w:460,
      h:460,
      r:230
    };
  }


  return{

    cx:PFP.w/2,
    cy:PFP.h/2,
    w:PFP.w*.8,
    h:PFP.h*.8,
    r:PFP.w*.4

  };

}


function fitImage(){

  if(!img)return;

  const area=well();

  const ratio=Math.max(
    area.w/img.width,
    area.h/img.height
  );

  baseScale=ratio;
  scaleMult=1;

  if(zoomSlider){

    zoomSlider.value=100;

  }

  if(zoomVal){

    zoomVal.textContent="1.0×";

  }

  offX=0;
  offY=0;

}


/* =====================================================
   PAN / ZOOM
===================================================== */

function canvasPoint(event){

  const rect=
    canvas.getBoundingClientRect();

  const sx=
    canvas.width/rect.width;

  const sy=
    canvas.height/rect.height;

  return{

    x:(
      event.clientX-
      rect.left
    )*sx,

    y:(
      event.clientY-
      rect.top
    )*sy

  };

}


canvas.addEventListener(
  "pointerdown",
  event=>{

    /*
      Crew images use their own renderer,
      so normal canvas pan/zoom is only
      applied to the main uploaded image.
    */

    if(!img || mode==="crew")return;

    dragging=true;

    dragStart=
      canvasPoint(event);

    offStart={
      x:offX,
      y:offY
    };

    canvas.setPointerCapture(
      event.pointerId
    );

  }
);


canvas.addEventListener(
  "pointermove",
  event=>{

    if(!dragging || !img)return;

    const p=
      canvasPoint(event);

    offX=
      offStart.x+
      p.x-
      dragStart.x;

    offY=
      offStart.y+
      p.y-
      dragStart.y;

    draw();

  }
);


["pointerup","pointercancel","pointerleave"]
.forEach(eventName=>{

  canvas.addEventListener(
    eventName,
    ()=>{
      dragging=false;
    }
  );

});


if(zoomSlider){

  zoomSlider.addEventListener(
    "input",
    ()=>{

      scaleMult=
        zoomSlider.value/100;

      zoomVal.textContent=
        `${scaleMult.toFixed(1)}×`;

      draw();

    }
  );

}


/* =====================================================
   BUILDER INPUTS
===================================================== */

[
  nameInput,
  roleInput,
  badgeInput
].forEach(input=>{

  if(!input)return;

  input.addEventListener(
    "input",
    ()=>{

      draw();
      updateCaption();

    }
  );

});


if(rerollBtn){

  rerollBtn.addEventListener(
    "click",
    ()=>{

      rollTitle();

      draw();

      updateCaption();

    }
  );

}


/* =====================================================
   BANNER INPUTS
===================================================== */

[
  bannerTitle,
  bannerSub,
  bannerLocation,
  bannerDate,
  bannerSize,
  bannerPhotoPosition,
  bannerTheme,
  bannerFont,
  bannerPhoto
].forEach(input=>{

  if(!input)return;


  input.addEventListener(
    "input",
    ()=>{

      if(
        mode==="banner" &&
        input===bannerSize
      ){

        const size=
          getBannerSize();

        canvas.width=size.w;
        canvas.height=size.h;

        if(img){

          fitImage();

        }

      }

      draw();
      updateCaption();

    }
  );


  input.addEventListener(
    "change",
    ()=>{

      if(
        mode==="banner" &&
        input===bannerSize
      ){

        const size=
          getBannerSize();

        canvas.width=size.w;
        canvas.height=size.h;

        if(img){

          fitImage();

        }

      }


      if(
        mode==="banner" &&
        input===bannerPhotoPosition &&
        img
      ){

        fitImage();

      }


      draw();
      updateCaption();

    }
  );

});


/* =====================================================
   DISPATCH INPUTS
===================================================== */

[
  dispatchTitle,
  dispatchMessage,
  dispatchFrom,
  dispatchStamp,
  dispatchTheme
].forEach(input=>{

  if(!input)return;


  input.addEventListener(
    "input",
    ()=>{

      draw();
      updateCaption();

    }
  );


  input.addEventListener(
    "change",
    ()=>{

      draw();
      updateCaption();

    }
  );

});


/* =====================================================
   HACKATHON INPUTS
===================================================== */
[
  hackTopText,
  hackBottomText,
  hackRibbon1,
  hackRibbon2
].forEach(input=>{
  if(!input)return;
  input.addEventListener("input", ()=>{
    draw();
    updateCaption();
  });
});


/* =====================================================
   CREW INPUTS
===================================================== */

[
  crewCount,
  crewName1,
  crewName2,
  crewName3
].forEach(input=>{

  if(!input)return;


  input.addEventListener(
    "input",
    ()=>{

      if(input===crewCount){

        updateCrewFieldsVisibility();

      }

      draw();
      updateCaption();

    }
  );


  input.addEventListener(
    "change",
    ()=>{

      if(input===crewCount){

        updateCrewFieldsVisibility();

      }

      draw();
      updateCaption();

    }
  );

});


/* =====================================================
   ROUND RECT
===================================================== */

function roundRectPath(
  x,
  y,
  width,
  height,
  radius
){

  ctx.beginPath();

  ctx.moveTo(
    x+radius,
    y
  );

  ctx.arcTo(
    x+width,
    y,
    x+width,
    y+height,
    radius
  );

  ctx.arcTo(
    x+width,
    y+height,
    x,
    y+height,
    radius
  );

  ctx.arcTo(
    x,
    y+height,
    x,
    y,
    radius
  );

  ctx.arcTo(
    x,
    y,
    x+width,
    y,
    radius
  );

  ctx.closePath();

}


/* =====================================================
   NORMAL IMAGE DRAW
===================================================== */

function drawImageInto(
  cx,
  cy,
  width,
  height,
  clipFn
){

  if(!img)return;

  ctx.save();

  clipFn();

  ctx.clip();


  const scale=
    baseScale*scaleMult;


  const drawWidth=
    img.width*scale;

  const drawHeight=
    img.height*scale;


  const drawX=
    cx-
    drawWidth/2+
    offX;

  const drawY=
    cy-
    drawHeight/2+
    offY;


  ctx.drawImage(
    img,
    drawX,
    drawY,
    drawWidth,
    drawHeight
  );


  ctx.restore();

}


/* =====================================================
   CREW IMAGE DRAW
===================================================== */

/*
  IMPORTANT:

  This function is separate from drawImageInto()
  because every crew member has a different
  Image object.

  Friend 1 -> crewImages[0]
  Friend 2 -> crewImages[1]
  Friend 3 -> crewImages[2]

  It does NOT use the global img,
  baseScale, scaleMult, offX or offY.
*/

function drawCrewImageInto(
  image,
  cx,
  cy,
  width,
  height,
  clipFn
){

  if(!image)return;

  ctx.save();


  clipFn();

  ctx.clip();


  /*
    "Cover" behaviour.

    The image is scaled until the entire
    photo area is filled, preventing empty
    spaces inside the frame.
  */

  const ratio=
    Math.max(
      width/image.width,
      height/image.height
    );


  const drawWidth=
    image.width*ratio;

  const drawHeight=
    image.height*ratio;


  const drawX=
    cx-
    drawWidth/2;

  const drawY=
    cy-
    drawHeight/2;


  ctx.drawImage(
    image,
    drawX,
    drawY,
    drawWidth,
    drawHeight
  );


  ctx.restore();

}


/* =====================================================
   BACKGROUND
===================================================== */

function drawBackground(
  width,
  height
){

  const gradient=
    ctx.createLinearGradient(
      0,
      0,
      width,
      height
    );


  gradient.addColorStop(
    0,
    FOREST
  );

  gradient.addColorStop(
    .65,
    FOREST_DEEP
  );

  gradient.addColorStop(
    1,
    "#052A17"
  );


  ctx.fillStyle=gradient;

  ctx.fillRect(
    0,
    0,
    width,
    height
  );

}


/* =====================================================
   MAIN DRAW
===================================================== */

function draw(){

  if(mode==="pfp"){

    drawPFP();

  }else if(mode==="card"){

    drawCard();

  }else if(mode==="banner"){

    drawBanner();

  }else if(mode==="crew"){

    drawCrew();

  }else if(mode==="dispatch"){

    drawDispatch();

  }else if(mode==="hackathon"){

    drawHackathon();

  }

}


/* =====================================================
   PFP
===================================================== */

function drawPFP(){

  const w=PFP.w;
  const h=PFP.h;

  drawBackground(w,h);


  const cx=w/2;
  const cy=h/2;
  const r=w*.40;


  if(img){

    drawImageInto(
      cx,
      cy,
      r*2,
      r*2,
      ()=>{

        ctx.beginPath();

        ctx.arc(
          cx,
          cy,
          r,
          0,
          Math.PI*2
        );

      }
    );

  }else{

    ctx.fillStyle=
      "rgba(251,243,220,.08)";

    ctx.beginPath();

    ctx.arc(
      cx,
      cy,
      r,
      0,
      Math.PI*2
    );

    ctx.fill();


    ctx.fillStyle=
      "rgba(251,243,220,.4)";

    ctx.font=
      '500 22px "Space Grotesk"';

    ctx.textAlign="center";
    ctx.textBaseline="middle";

    ctx.fillText(
      "Your photo appears here",
      cx,
      cy
    );

  }


  ctx.beginPath();

  ctx.arc(
    cx,
    cy,
    r+10,
    0,
    Math.PI*2
  );

  ctx.lineWidth=14;
  ctx.strokeStyle=PINK;
  ctx.stroke();


  ctx.beginPath();

  ctx.arc(
    cx,
    cy,
    r+26,
    0,
    Math.PI*2
  );

  ctx.lineWidth=3;

  ctx.strokeStyle=
    "rgba(251,243,220,.55)";

  ctx.stroke();


  drawArcText(
    "HH GOA 2026",
    cx,
    cy,
    r+66,
    -Math.PI/2,
    6,
    '900 30px "Fraunces"',
    CREAM,
    1
  );


  drawArcText(
    "#FRAMEINGOA",
    cx,
    cy,
    r+66,
    Math.PI/2,
    8,
    '700 20px "JetBrains Mono"',
    YELLOW,
    1
  );

}


/* =====================================================
   HACKATHON BADGE
===================================================== */
function drawHackathon(){
  const w = HACKATHON.w;
  const h = HACKATHON.h;
  const cx = w/2;
  const cy = h/2;
  const r = w*.47; // Outer radius

  // Clear for transparent corners
  ctx.clearRect(0, 0, w, h);

  // 1. Outer Cream Ring
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI*2);
  ctx.fillStyle = CREAM;
  ctx.fill();
  
  // Pink outer edge outline
  ctx.lineWidth = 10;
  ctx.strokeStyle = PINK;
  ctx.stroke();

  // 2. Inner Green Circle
  const innerR = r - 75;
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, Math.PI*2);
  ctx.fillStyle = FOREST_DEEP;
  ctx.fill();

  // Subtle gradient texture in the green
  const grd = ctx.createRadialGradient(cx, cy, innerR-150, cx, cy, innerR);
  grd.addColorStop(0, FOREST);
  grd.addColorStop(1, FOREST_DEEP);
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, Math.PI*2);
  ctx.fillStyle = grd;
  ctx.fill();

  // Outer gold rim
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, Math.PI*2);
  ctx.lineWidth = 4;
  ctx.strokeStyle = YELLOW;
  ctx.stroke();

  // 3. Top Arc Text (Reading Left to Right)
  drawArcText(
    (hackTopText?.value || "HACKER HOUSE GOA 2026").toUpperCase(),
    cx, cy, r - 38, -Math.PI/2, 6, '900 48px "Fraunces"', FOREST_DEEP, 1
  );

  // 4. Bottom Arc Text (Reading Left to Right at the bottom)
  drawArcText(
    (hackBottomText?.value || "#FRAMEINGOA").toUpperCase(),
    cx, cy, r - 38, Math.PI/2, 10, '900 52px "JetBrains Mono"', YELLOW, -1
  );

  // 5. Center Photo
  const photoR = 210;

  // Gold shield/border around photo
  ctx.beginPath();
  ctx.arc(cx, cy, photoR + 15, 0, Math.PI*2);
  ctx.fillStyle = YELLOW;
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(cx, cy, photoR + 5, 0, Math.PI*2);
  ctx.fillStyle = FOREST_DEEP;
  ctx.fill();

  if(img){
    drawImageInto(
      cx, cy, photoR*2, photoR*2,
      () => {
        ctx.beginPath();
        ctx.arc(cx, cy, photoR, 0, Math.PI*2);
      }
    );
  } else {
    ctx.beginPath();
    ctx.arc(cx, cy, photoR, 0, Math.PI*2);
    ctx.fillStyle = "rgba(251,243,220,.1)";
    ctx.fill();
    ctx.fillStyle = "rgba(251,243,220,.5)";
    ctx.font = '500 24px "Space Grotesk"';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("YOUR PHOTO", cx, cy);
  }

  // 6. Ribbons
  function drawRibbon(y, text){
    const rw = 210;
    const rh = 54;
    ctx.save();
    ctx.translate(cx, y);

    // Chevron Ribbon Shape
    ctx.beginPath();
    ctx.moveTo(-rw, -rh/2);
    ctx.lineTo(rw, -rh/2);
    ctx.lineTo(rw + 25, 0);
    ctx.lineTo(rw, rh/2);
    ctx.lineTo(-rw, rh/2);
    ctx.lineTo(-rw - 25, 0);
    ctx.closePath();

    ctx.fillStyle = FOREST_DEEP;
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = YELLOW;
    ctx.stroke();

    // Ribbon Text
    ctx.fillStyle = CREAM;
    ctx.font = '700 24px "JetBrains Mono"';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 0, 3);

    ctx.restore();
  }

  drawRibbon(cy - photoR - 15, (hackRibbon1?.value || "MASTER BADGE").toUpperCase());
  drawRibbon(cy + photoR + 15, (hackRibbon2?.value || "247 BUILDERS").toUpperCase());
}


/* =====================================================
   ARC TEXT
===================================================== */

function drawArcText(
  text,
  cx,
  cy,
  radius,
  startAngle,
  spacing,
  font,
  color,
  direction
){

  ctx.save();

  ctx.fillStyle=color;
  ctx.font=font;

  ctx.textAlign="center";
  ctx.textBaseline="middle";


  let angle=startAngle;


  text.split("").forEach(char=>{

    const width=
      ctx.measureText(char).width;


    const theta=
      ((width+spacing)/radius)*
      direction;


    angle+=theta/2;


    ctx.save();


    ctx.translate(
      cx+
      radius*Math.cos(angle),

      cy+
      radius*Math.sin(angle)
    );


    ctx.rotate(
      angle+
      Math.PI/2*
      direction
    );


    ctx.fillText(
      char,
      0,
      0
    );


    ctx.restore();


    angle+=theta/2;

  });


  ctx.restore();

}


/* =====================================================
   BUILDER CARD
===================================================== */

function drawCard(){

  const w=CARD.w;
  const h=CARD.h;

  drawBackground(w,h);


  ctx.textAlign="left";
  ctx.textBaseline="alphabetic";


  ctx.fillStyle=YELLOW;

  ctx.font=
    '700 22px "JetBrains Mono"';

  ctx.fillText(
    "HACKER HOUSE · GOA",
    56,
    74
  );


  ctx.fillStyle=CREAM;

  ctx.font=
    '900 62px "Fraunces"';

  ctx.fillText(
    "BUILDER 2026",
    52,
    140
  );


  ctx.textAlign="right";

  ctx.fillStyle=
    "rgba(251,243,220,.6)";

  ctx.font=
    '500 18px "JetBrains Mono"';

  ctx.fillText(
    `NO. ${badgeInput?.value||badgeNo}`,
    w-56,
    74
  );


  const cx=w/2;
  const top=210;
  const size=w*.78;
  const radius=30;


  if(img){

    drawImageInto(
      cx,
      top+size/2,
      size,
      size,
      ()=>{

        roundRectPath(
          cx-size/2,
          top,
          size,
          size,
          radius
        );

      }
    );

  }else{

    roundRectPath(
      cx-size/2,
      top,
      size,
      size,
      radius
    );


    ctx.fillStyle=
      "rgba(251,243,220,.08)";

    ctx.fill();


    ctx.fillStyle=
      "rgba(251,243,220,.4)";

    ctx.font=
      '500 24px "Space Grotesk"';

    ctx.textAlign="center";
    ctx.textBaseline="middle";


    ctx.fillText(
      "Your photo appears here",
      cx,
      top+size/2
    );

  }


  roundRectPath(
    cx-size/2,
    top,
    size,
    size,
    radius
  );

  ctx.lineWidth=6;
  ctx.strokeStyle=PINK;
  ctx.stroke();


  const name=
    (
      nameInput?.value||
      "YOUR NAME"
    ).toUpperCase();


  const nameY=
    top+size+92;


  ctx.textAlign="center";
  ctx.textBaseline="alphabetic";


  ctx.fillStyle=CREAM;

  ctx.font=
    '900 50px "Fraunces"';

  ctx.fillText(
    name,
    cx,
    nameY
  );


  ctx.fillStyle=YELLOW;

  ctx.font=
    '500 26px "JetBrains Mono"';

  ctx.fillText(
    (
      roleInput?.value||
      "BUILDER"
    ).toUpperCase(),
    cx,
    nameY+55
  );


  ctx.fillStyle=PINK;

  ctx.font=
    '700 20px "JetBrains Mono"';

  ctx.fillText(
    builderTitleEl?.textContent||"",
    cx,
    nameY+105
  );


  ctx.textAlign="left";

  ctx.fillStyle=
    "rgba(251,243,220,.55)";

  ctx.font=
    '500 20px "JetBrains Mono"';

  ctx.fillText(
    "#FrameInGoa",
    56,
    h-46
  );


  ctx.textAlign="right";

  ctx.fillText(
    "28–31 OCT · GOA",
    w-56,
    h-46
  );

}


/* =====================================================
   SIGNAL BANNER
===================================================== */

function drawBanner(){

  const size=getBannerSize();

  const w=size.w;
  const h=size.h;


  let bg;
  let main;
  let accent;


  if(bannerTheme?.value==="pink"){

    bg=PINK;
    main=CREAM;
    accent=YELLOW;

  }else if(bannerTheme?.value==="yellow"){

    bg=YELLOW;
    main=FOREST_DEEP;
    accent=PINK;

  }else if(bannerTheme?.value==="cream"){

    bg=CREAM;
    main=FOREST_DEEP;
    accent=PINK;

  }else{

    bg=FOREST;
    main=YELLOW;
    accent=PINK;

  }


  ctx.fillStyle=bg;

  ctx.fillRect(
    0,
    0,
    w,
    h
  );


  /* GRID */

  ctx.save();

  ctx.globalAlpha=.07;

  ctx.strokeStyle=main;


  for(
    let x=0;
    x<w;
    x+=60
  ){

    ctx.beginPath();
    ctx.moveTo(x,0);
    ctx.lineTo(x,h);
    ctx.stroke();

  }


  for(
    let y=0;
    y<h;
    y+=60
  ){

    ctx.beginPath();
    ctx.moveTo(0,y);
    ctx.lineTo(w,y);
    ctx.stroke();

  }


  ctx.restore();


  /* PHOTO */

  const showPhoto=
    bannerPhoto?.value!=="no";


  const photoSize=
    Math.min(
      h*.70,
      w*.34
    );


  const photoY=
    (h-photoSize)/2;


  const photoX=
    bannerPhotoPosition?.value==="left"
      ?w*.06
      :w-photoSize-w*.06;


  if(showPhoto){

    if(img){

      drawImageInto(
        photoX+photoSize/2,
        photoY+photoSize/2,
        photoSize,
        photoSize,
        ()=>{

          roundRectPath(
            photoX,
            photoY,
            photoSize,
            photoSize,
            8
          );

        }
      );

    }else{

      roundRectPath(
        photoX,
        photoY,
        photoSize,
        photoSize,
        8
      );

      ctx.fillStyle=
        "rgba(251,243,220,.1)";

      ctx.fill();

    }


    ctx.strokeStyle=accent;
    ctx.lineWidth=8;

    ctx.strokeRect(
      photoX,
      photoY,
      photoSize,
      photoSize
    );


    ctx.strokeStyle=main;
    ctx.lineWidth=2;

    ctx.strokeRect(
      photoX+14,
      photoY+14,
      photoSize,
      photoSize
    );

  }


  /* TEXT */

  const textLeft=
    bannerPhotoPosition?.value==="left"
      ?w*.53
      :w*.07;


  ctx.textAlign="left";
  ctx.textBaseline="alphabetic";


  ctx.fillStyle=accent;

  ctx.font=
    '700 21px "JetBrains Mono"';

  ctx.fillText(
    "03 · SIGNAL BANNER",
    textLeft,
    h*.17
  );


  let titleFont;


  if(bannerFont?.value==="mono"){

    titleFont=
      '900 70px "JetBrains Mono"';

  }else if(bannerFont?.value==="bold"){

    titleFont=
      '900 88px "Space Grotesk"';

  }else{

    titleFont=
      '900 100px "Fraunces"';

  }


  ctx.fillStyle=main;
  ctx.font=titleFont;


  drawFittedText(
    bannerTitle?.value||
    "HACKER HOUSE",
    textLeft,
    h*.39,
    w*.42,
    titleFont
  );


  if(bannerFont?.value==="mono"){

    ctx.font=
      '900 44px "JetBrains Mono"';

  }else if(bannerFont?.value==="bold"){

    ctx.font=
      '900 55px "Space Grotesk"';

  }else{

    ctx.font=
      '900 62px "Fraunces"';

  }


  ctx.fillStyle=accent;

  ctx.fillText(
    bannerSub?.value||"GOA",
    textLeft,
    h*.55
  );


  ctx.fillStyle=main;
  ctx.globalAlpha=.75;

  ctx.font=
    '500 20px "JetBrains Mono"';


  ctx.fillText(
    bannerLocation?.value||
    "GOA, INDIA",
    textLeft,
    h*.70
  );


  ctx.fillText(
    bannerDate?.value||
    "28 — 31 OCT 2026",
    textLeft,
    h*.76
  );


  ctx.globalAlpha=1;


  ctx.fillStyle=accent;

  ctx.font=
    '700 19px "JetBrains Mono"';

  ctx.fillText(
    "#FRAMEINGOA",
    textLeft,
    h*.89
  );


  ctx.textAlign="right";

  ctx.fillStyle=main;
  ctx.globalAlpha=.6;

  ctx.fillText(
    "HACKER HOUSE · GOA",
    w-w*.06,
    h*.89
  );


  ctx.globalAlpha=1;

}


/* =====================================================
   FIT BANNER TEXT
===================================================== */

function drawFittedText(
  text,
  x,
  y,
  maxWidth,
  font
){

  ctx.font=font;


  if(
    ctx.measureText(text).width<=maxWidth
  ){

    ctx.fillText(
      text,
      x,
      y
    );

    return;

  }


  const words=text.split(" ");

  let line="";

  let lineY=y;


  const lineHeight=
    parseInt(
      font.match(/\d+/)?.[0]||70
    )*.9;


  words.forEach(word=>{

    const test=
      line?
      `${line} ${word}`:
      word;


    if(
      ctx.measureText(test).width>
      maxWidth
    ){

      if(line){

        ctx.fillText(
          line,
          x,
          lineY
        );

      }

      line=word;

      lineY+=lineHeight;

    }else{

      line=test;

    }

  });


  if(line){

    ctx.fillText(
      line,
      x,
      lineY
    );

  }

}


/* =====================================================
   CREW COLLAGE
===================================================== */

function drawCrew(){

  const w=CREW.w;
  const h=CREW.h;


  drawBackground(w,h);


  /* =====================================================
     CREW INDIVIDUAL POSTER
  ===================================================== */

  function drawIndividualCrewPoster(
    people
  ){

    const count=people.length;


    /*
      Portrait (taller-than-wide) cards.

      Square cards at count===3 previously
      overflowed the 1080px canvas width
      (350*3 + 35*2 = 1120px > 1080px),
      which is why the third photo was
      getting cut off at the edge.

      Going portrait also fills the tall
      1080×1350 canvas properly instead of
      leaving a big empty gap between the
      photos and the bottom label.
    */

    let photoW;
    let photoH;
    let gap;
    let nameFontSize;
    let numberFontSize;
    let placeholderFontSize;

    if(count===1){

      photoW=560;
      photoH=680;
      gap=0;
      nameFontSize=54;
      numberFontSize=22;
      placeholderFontSize=24;

    }else if(count===2){

      photoW=430;
      photoH=560;
      gap=55;
      nameFontSize=46;
      numberFontSize=20;
      placeholderFontSize=22;

    }else{

      photoW=300;
      photoH=460;
      gap=40;
      nameFontSize=36;
      numberFontSize=19;
      placeholderFontSize=19;

    }


    const totalWidth=
      count*photoW+
      (count-1)*gap;


    const startX=
      (w-totalWidth)/2;


    /* VERTICAL CENTERING */

    const nameGap=58;
    const numberGap=32;

    const blockHeight=
      photoH+nameGap+numberGap;

    const contentTop=232;
    const contentBottom=h-215;

    const available=
      contentBottom-contentTop;

    const photoY=
      contentTop+
      Math.max(
        0,
        (available-blockHeight)/2
      );


    people.forEach(
      (person,index)=>{

        const x=
          startX+
          index*(photoW+gap);


        /* PHOTO FRAME */

        roundRectPath(
          x,
          photoY,
          photoW,
          photoH,
          25
        );


        /*
          IMPORTANT FIX:

          Use drawCrewImageInto()
          instead of drawImageInto().

          person.image is different
          for every friend.
        */

        if(person.image){

          drawCrewImageInto(
            person.image,
            x+photoW/2,
            photoY+photoH/2,
            photoW,
            photoH,
            ()=>{

              roundRectPath(
                x,
                photoY,
                photoW,
                photoH,
                25
              );

            }
          );

        }else{

          ctx.save();

          roundRectPath(
            x,
            photoY,
            photoW,
            photoH,
            25
          );

          ctx.clip();


          ctx.fillStyle=
            "rgba(251,243,220,.08)";

          ctx.fillRect(
            x,
            photoY,
            photoW,
            photoH
          );


          ctx.restore();

        }


        /* BORDER */

        roundRectPath(
          x,
          photoY,
          photoW,
          photoH,
          25
        );


        ctx.lineWidth=10;

        ctx.strokeStyle=PINK;

        ctx.stroke();


        ctx.lineWidth=3;

        ctx.strokeStyle=YELLOW;


        roundRectPath(
          x+15,
          photoY+15,
          photoW-30,
          photoH-30,
          18
        );

        ctx.stroke();


        /* PLACEHOLDER */

        if(!person.image){

          ctx.textAlign="center";
          ctx.textBaseline="middle";

          ctx.fillStyle=
            "rgba(251,243,220,.5)";

          ctx.font=
            `500 ${placeholderFontSize}px "Space Grotesk"`;


          ctx.fillText(
            `FRIEND ${index+1} PHOTO`,
            x+photoW/2,
            photoY+photoH/2
          );

        }


        /* NAME */

        ctx.textAlign="center";
        ctx.textBaseline="alphabetic";

        ctx.fillStyle=CREAM;

        ctx.font=
          `900 ${nameFontSize}px "Fraunces"`;


        ctx.fillText(
          person.name,
          x+photoW/2,
          photoY+photoH+nameGap
        );


        /* NUMBER */

        ctx.fillStyle=YELLOW;

        ctx.font=
          `700 ${numberFontSize}px "JetBrains Mono"`;


        ctx.fillText(
          `// 0${index+1}`,
          x+photoW/2,
          photoY+photoH+nameGap+numberGap
        );

      }
    );


    /* CREW LABEL — positioned relative to
       the photo block instead of a fixed
       offset from the canvas bottom, so it
       never floats in empty space. */

    const labelY=
      photoY+
      photoH+
      nameGap+
      numberGap+
      70;

    ctx.textAlign="center";

    ctx.fillStyle=PINK;

    ctx.font=
      '900 28px "JetBrains Mono"';


    ctx.fillText(
      `${count} ${
        count===1
          ?"BUILDER"
          :"BUILDERS"
      } · ONE CREW`,
      w/2,
      Math.min(
        labelY,
        h-90
      )
    );

  }


  /* =====================================================
     CREW GROUP PHOTO POSTER
  ===================================================== */

  function drawCrewGroupPoster(
    people,
    groupImage
  ){

    const photoX=170;
    const photoY=275;
    const photoW=w-340;
    const photoH=600;


    /* GROUP PHOTO */

    roundRectPath(
      photoX,
      photoY,
      photoW,
      photoH,
      30
    );


    ctx.save();

    ctx.clip();


    const ratio=Math.max(
      photoW/groupImage.width,
      photoH/groupImage.height
    );


    const dw=
      groupImage.width*ratio;

    const dh=
      groupImage.height*ratio;


    ctx.drawImage(
      groupImage,
      photoX+
        (photoW-dw)/2,
      photoY+
        (photoH-dh)/2,
      dw,
      dh
    );


    ctx.restore();


    /* BORDER */

    roundRectPath(
      photoX,
      photoY,
      photoW,
      photoH,
      30
    );


    ctx.lineWidth=12;

    ctx.strokeStyle=PINK;

    ctx.stroke();


    ctx.lineWidth=4;

    ctx.strokeStyle=YELLOW;


    roundRectPath(
      photoX+18,
      photoY+18,
      photoW-36,
      photoH-36,
      22
    );

    ctx.stroke();


    /* NAMES */

    ctx.textAlign="center";

    ctx.fillStyle=CREAM;

    ctx.font=
      '900 38px "Fraunces"';


    const names=
      people
        .map(person=>person.name)
        .join("  ·  ");


    ctx.fillText(
      names,
      w/2,
      photoY+photoH+75
    );


    /* LABEL */

    ctx.fillStyle=PINK;

    ctx.font=
      '700 22px "JetBrains Mono"';


    ctx.fillText(
      "THE GOA CREW",
      w/2,
      photoY+photoH+115
    );

  }


  /* =====================================================
     HEADER
  ===================================================== */

  ctx.textAlign="center";
  ctx.textBaseline="alphabetic";


  ctx.fillStyle=YELLOW;

  ctx.font=
    '700 24px "JetBrains Mono"';


  ctx.fillText(
    "HACKER HOUSE · GOA 2026",
    w/2,
    70
  );


  ctx.fillStyle=CREAM;

  ctx.font=
    '900 72px "Fraunces"';


  ctx.fillText(
    "THE CREW",
    w/2,
    150
  );


  ctx.fillStyle=PINK;

  ctx.font=
    '700 22px "JetBrains Mono"';


  ctx.fillText(
    "BUILD TOGETHER · SHIP TOGETHER",
    w/2,
    195
  );


  /* =====================================================
     DATA
  ===================================================== */

  const count=
    Math.min(
      3,
      Math.max(
        1,
        Number(
          crewCount?.value||1
        )
      )
    );


  const names=[
    crewName1?.value||"FRIEND 01",
    crewName2?.value||"FRIEND 02",
    crewName3?.value||"FRIEND 03"
  ];


  const people=[];


  for(
    let i=0;
    i<count;
    i++
  ){

    people.push({

      image:crewImages[i],

      name:
        names[i].toUpperCase()

    });

  }


  /* =====================================================
     GROUP PHOTO
  ===================================================== */

  if(crewGroupImage){

    drawCrewGroupPoster(
      people,
      crewGroupImage
    );

  }else{

    drawIndividualCrewPoster(
      people
    );

  }


  /* =====================================================
     FOOTER
  ===================================================== */

  ctx.textAlign="left";

  ctx.fillStyle=
    "rgba(251,243,220,.65)";

  ctx.font=
    '600 21px "JetBrains Mono"';


  ctx.fillText(
    "#FRAMEINGOA",
    60,
    h-45
  );


  ctx.textAlign="right";


  ctx.fillText(
    "28–31 OCT · GOA, INDIA",
    w-60,
    h-45
  );

}


/* =====================================================
   GOA DISPATCH
===================================================== */

function drawDispatch(){

  const w=DISPATCH.w;
  const h=DISPATCH.h;


  let bg;
  let card;
  let ink;
  let accent;


  if(dispatchTheme?.value==="pink"){

    bg=FOREST_DEEP;
    card="#F7E5D0";
    ink=FOREST_DEEP;
    accent=PINK;

  }else if(dispatchTheme?.value==="cream"){

    bg=FOREST;
    card=CREAM;
    ink=FOREST_DEEP;
    accent=YELLOW;

  }else if(dispatchTheme?.value==="green"){

    bg="#064D2A";
    card=CREAM_2;
    ink=FOREST_DEEP;
    accent=YELLOW;

  }else{

    bg=FOREST_DEEP;
    card="#FFE016";
    ink=FOREST_DEEP;
    accent=PINK;

  }


  /* BACKGROUND */

  ctx.fillStyle=bg;

  ctx.fillRect(
    0,
    0,
    w,
    h
  );


  /* POSTCARD */

  const x=w*.08;
  const y=h*.10;
  const pw=w*.84;
  const ph=h*.80;


  ctx.save();


  ctx.shadowColor=
    "rgba(0,0,0,.25)";

  ctx.shadowBlur=25;
  ctx.shadowOffsetY=15;

  ctx.fillStyle=card;


  ctx.fillRect(
    x,
    y,
    pw,
    ph
  );


  ctx.restore();


  /* BORDER */

  ctx.strokeStyle=ink;
  ctx.lineWidth=4;


  ctx.strokeRect(
    x+12,
    y+12,
    pw-24,
    ph-24
  );


  /* TOP LABEL */

  ctx.fillStyle=accent;

  ctx.font=
    '700 20px "JetBrains Mono"';

  ctx.textAlign="left";


  ctx.fillText(
    "/ GOA DISPATCH",
    x+42,
    y+55
  );


  ctx.fillStyle=
    "rgba(18,52,34,.5)";

  ctx.font=
    '500 17px "JetBrains Mono"';


  ctx.fillText(
    "THE HIDDEN POSTCARD PRESS",
    x+235,
    y+55
  );


  /* TITLE */

  ctx.fillStyle=ink;

  ctx.font=
    '900 65px "Fraunces"';


  drawFittedText(
    dispatchTitle?.value||
    "Greetings from Goa",
    x+42,
    y+155,
    pw*.55,
    '900 65px "Fraunces"'
  );


  /* LINE */

  ctx.strokeStyle=ink;
  ctx.globalAlpha=.45;
  ctx.lineWidth=2;


  ctx.beginPath();

  ctx.moveTo(
    x+42,
    y+205
  );

  ctx.lineTo(
    x+pw*.60,
    y+205
  );

  ctx.stroke();


  ctx.globalAlpha=1;


  /* MESSAGE */

  ctx.fillStyle=ink;

  ctx.font=
    '500 22px "JetBrains Mono"';


  drawWrappedText(
    dispatchMessage?.value||
    "Dear future me, we built something bright by the sea.",
    x+42,
    y+250,
    pw*.55,
    34
  );


  /* PHOTO */

  const photoSize=
    Math.min(
      pw*.27,
      ph*.52
    );


  const photoX=
    x+pw-photoSize-48;


  const photoY=
    y+ph-photoSize-48;


  ctx.strokeStyle=accent;
  ctx.lineWidth=7;


  ctx.strokeRect(
    photoX-10,
    photoY-10,
    photoSize+20,
    photoSize+20
  );


  if(img){

    drawImageInto(
      photoX+photoSize/2,
      photoY+photoSize/2,
      photoSize,
      photoSize,
      ()=>{

        ctx.beginPath();

        ctx.rect(
          photoX,
          photoY,
          photoSize,
          photoSize
        );

      }
    );

  }else{

    ctx.fillStyle=
      "rgba(18,52,34,.1)";

    ctx.fillRect(
      photoX,
      photoY,
      photoSize,
      photoSize
    );


    ctx.fillStyle=
      "rgba(18,52,34,.5)";

    ctx.font=
      '500 18px "JetBrains Mono"';

    ctx.textAlign="center";


    ctx.fillText(
      "YOUR PHOTO",
      photoX+photoSize/2,
      photoY+photoSize/2
    );

  }


  /* STAMP */

  ctx.textAlign="center";

  ctx.strokeStyle=accent;
  ctx.lineWidth=3;


  ctx.strokeRect(
    x+pw-185,
    y+42,
    125,
    62
  );


  ctx.fillStyle=accent;

  ctx.font=
    '700 16px "JetBrains Mono"';


  ctx.fillText(
    dispatchStamp?.value||"",
    x+pw-122,
    y+78
  );


  /* FOOTER */

  ctx.textAlign="left";

  ctx.fillStyle=ink;

  ctx.font=
    '700 19px "JetBrains Mono"';


  ctx.fillText(
    `FROM: ${
      dispatchFrom?.value||
      "Hacker House Goa"
    }`,
    x+42,
    y+ph-42
  );


  ctx.textAlign="right";


  ctx.fillText(
    "#FrameInGoa",
    x+pw-42,
    y+ph-42
  );

}


/* =====================================================
   WRAPPED TEXT
===================================================== */

function drawWrappedText(
  text,
  x,
  y,
  maxWidth,
  lineHeight
){

  const words=text.split(" ");

  let line="";

  let currentY=y;


  words.forEach(word=>{

    const test=
      line?
      `${line} ${word}`:
      word;


    if(
      ctx.measureText(test).width>
      maxWidth
    ){

      if(line){

        ctx.fillText(
          line,
          x,
          currentY
        );

      }

      line=word;

      currentY+=lineHeight;

    }else{

      line=test;

    }

  });


  if(line){

    ctx.fillText(
      line,
      x,
      currentY
    );

  }

}


/* =====================================================
   CAPTION
===================================================== */

function updateCaption(){

  let caption;


  if(mode==="pfp"){

    caption=
      "Repping HH Goa 2026 as my new PFP 🌴⚡ #FrameInGoa";

  }else if(mode==="card"){

    caption=
      `Just got my Builder ID for HH Goa 2026 — ${
        builderTitleEl?.textContent||"BUILDER"
      }. 🌊💻 #FrameInGoa`;

  }else if(mode==="banner"){

    caption=
      `${
        bannerTitle?.value||
        "Hacker House"
      } ${
        bannerSub?.value||
        "Goa"
      } 🌴 #FrameInGoa`;

  }else if(mode==="crew"){

    const count=
      Number(
        crewCount?.value||1
      );


    const names=[
      crewName1?.value,
      crewName2?.value,
      crewName3?.value
    ]
    .slice(
      0,
      count
    )
    .filter(Boolean);


    caption=
      `Our HH Goa 2026 crew — ${
        names.join(", ")||
        "the crew"
      } 🌴⚡ #FrameInGoa`;

  }else if(mode==="hackathon"){

    caption=
      `Unlocking my ${
        hackRibbon1?.value||"MASTER BADGE"
      } for the hackathon! 🛠️🔥 #FrameInGoa`;

  }else{

    caption=
      `${
        dispatchTitle?.value||
        "Greetings from Goa"
      } 🌴💌 #FrameInGoa`;

  }


  if(captionText){

    captionText.textContent=caption;

  }

}


/* =====================================================
   STATUS
===================================================== */

function showStatus(message){

  if(!statusEl)return;

  statusEl.textContent=message;

  statusEl.classList.add("show");


  clearTimeout(
    showStatus.timer
  );


  showStatus.timer=
    setTimeout(
      ()=>{
        statusEl.classList.remove("show");
      },
      2200
    );

}


/* =====================================================
   DOWNLOAD
===================================================== */

if(downloadBtn){

  downloadBtn.addEventListener(
    "click",
    ()=>{

      canvas.toBlob(
        blob=>{

          if(!blob)return;


          const link=
            document.createElement("a");


          link.href=
            URL.createObjectURL(blob);


          link.download=
            `hh-goa-2026-${mode}.png`;


          document.body.appendChild(link);

          link.click();

          link.remove();


          URL.revokeObjectURL(
            link.href
          );


          showStatus(
            "Downloaded ✓"
          );

        },
        "image/png"
      );

    }
  );

}


/* =====================================================
   SHARE
===================================================== */

if(shareBtn){

  shareBtn.addEventListener(
    "click",
    ()=>{

      canvas.toBlob(
        async blob=>{

          if(!blob)return;


          const file=
            new File(
              [blob],
              `hh-goa-2026-${mode}.png`,
              {
                type:"image/png"
              }
            );


          const caption=
            captionText?.textContent||"";


          if(
            navigator.canShare &&
            navigator.canShare({
              files:[file]
            })
          ){

            try{

              await navigator.share({
                files:[file],
                text:caption
              });


              showStatus(
                "Shared ✓"
              );


              return;

            }catch(error){

              if(
                error &&
                error.name==="AbortError"
              ){

                return;

              }

            }

          }


          const link=
            document.createElement("a");


          link.href=
            URL.createObjectURL(blob);


          link.download=
            `hh-goa-2026-${mode}.png`;


          document.body.appendChild(link);

          link.click();

          link.remove();


          URL.revokeObjectURL(
            link.href
          );


          const xUrl=
            "https://twitter.com/intent/tweet?text="+
            encodeURIComponent(caption);


          window.open(
            xUrl,
            "_blank"
          );


          showStatus(
            "Image downloaded"
          );

        },
        "image/png"
      );

    }
  );

}


/* =====================================================
   INITIAL
===================================================== */

updateCaption();

draw();

})();