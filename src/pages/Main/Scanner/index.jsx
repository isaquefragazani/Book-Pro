/* eslint-disable import/no-extraneous-dependencies */
import React, {useEffect}  from "react";

import { validateIsbn } from "../../../services/Books";

import  Quagga  from "quagga";

import { Video } from "./styles";


function Scanner() {
  const onDetected = result  => {
     Quagga.offDetected(onDetected);

     const isbn = result.codeResult.code;

     if(validadeIsbn(isbn)){
      alert(`isbn válido ${isbn}`);
     } else {
      {
        if(scannerAttemps >= 5) {
          alert("Não foi possivel ler o codigo do item");
        }
      }
     }
     scannerAttemps++;
     Quagga.onDetected();

  };
  useEffect(()  =>{
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      Quagga.init({
        inputStream:{
          name: "Live",
          type: 'LiveStream',
          target: document.querySelector('#video'),
          constrainst: {
            facingMode: 'enviroment',
          },
        },
        numOfWorkes:1,
        locate: true,
        decoder: {
          readers: ['ean_reader'],
        },
      },
        err => {
          if (err) {
          console.error(err);
          alert(
            'Erro ao reconhecer camera'
          );
          return;
        }
        Quagga.start();
        }
        Quagga.onDetected(onDetected);
      );
    }

 }, []);

  return  <Video  id="video" />;
}


export default Scanner;
