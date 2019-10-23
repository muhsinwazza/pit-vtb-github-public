const customTransforms = {
  'test3': (obj, params) => {
    console.log(obj.src);
    console.log(obj.dst);
    console.log(params);
    return obj;
  },
  'createPlaceholderImages': (obj, params) => {
    obj.dst.segments.forEach(segment => {
      let neededImages = 9;
      if(segment.media.length < neededImages) {
        // let title = segment.subTitle;
        // if(!title) return;

        // let titleFrags = segment.subTitle.split('-');
        // if(!titleFrags.length) return;

        // let city = titleFrags[0].toLowerCase().trim();
        let imagesToCreate = neededImages - segment.media.length;
        
        for(let i = 0; i < imagesToCreate; i++) {
          // let image = (i == 0) ? city + '.jpg' : city + (i + 1) + '.jpg'; 
          
          // let resolution = ((imagesToCreate == 4 && i == 1) || (imagesToCreate == 3 && i == 0)) ? '85x150' : '150x150';
          if(segment.media[0]) {
            return
          } else {
            segment.media.push({
              'url': 'https://via.placeholder.com/350x350',
              'sourceType': 'mediaspirit'
            });
          }
          
        }
      }
    });

    return obj;
  }

};



module.exports = customTransforms;
