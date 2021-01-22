videojs.registerPlugin('backForwardButtons', function() {
    var myPlayer = this,
        jumpAmount = 15,
        controlBar,
        insertBeforeNode,
        newElementBB = document.createElement('div'),
        newElementFB = document.createElement('div'),
        newImageBB = document.createElement('img'),
        newImageFB = document.createElement('img');

    // +++ Assign IDs for later element manipulation +++
    newElementBB.id = 'backButton';
    newElementFB.id = 'forwardButton';

    // +++ Assign properties to elements and assign to parents +++
    newImageBB.setAttribute('src', 'https://raw.githubusercontent.com/bjuptech/forwardbuttons/main/backButton.png?token=ASR6NY2YOPWLFTXORLIUC5DABMQ5S');
    newElementBB.appendChild(newImageBB);
    newImageFB.setAttribute('src', 'https://raw.githubusercontent.com/bjuptech/forwardbuttons/main/forwardButton.png?token=ASR6NY3RJXPWCAYEK43JXBDABMRXE');
    newElementFB.appendChild(newImageFB);

    // +++ Get controlbar and insert elements +++
    controlBar = myPlayer.$('.vjs-control-bar');
    // Get the element to insert buttons in front of in conrolbar
    insertBeforeNode = myPlayer.$('.vjs-volume-panel');

    // Insert the button div in proper location
    controlBar.insertBefore(newElementBB, insertBeforeNode);
    controlBar.insertBefore(newElementFB, insertBeforeNode);

    // +++ Add event listeners to jump back or forward +++
    // Back button logic, don't jump to negative times
    newElementBB.addEventListener('click', function () {
      var newTime,
          rewindAmt = jumpAmount,
          videoTime = myPlayer.currentTime();
      if (videoTime >= rewindAmt) {
        newTime = videoTime - rewindAmt;
      } else {
        newTime = 0;
      }
      myPlayer.currentTime(newTime);
    });

    // Forward button logic, don't jump past the duration
    newElementFB.addEventListener('click', function () {
      var newTime,
          forwardAmt = jumpAmount,
          videoTime = myPlayer.currentTime(),
          videoDuration = myPlayer.duration();
      if (videoTime + forwardAmt <= videoDuration) {
        newTime = videoTime + forwardAmt;
      } else {
        newTime = videoDuration;
      }
      myPlayer.currentTime(newTime);
    });
  });
