# Set-up sheet: the room, the frame, the phone

For the series in `BRIEF.md`, carrying out the recording decisions of `PRODUCTION.md`.
Written 17 October 2026 for a host recording alone, in her consulting room, on a phone.
The sketch is `setup-sketch.svg`.

## The room

Start with the window. On an overcast day the window is the light, and the chair goes
where it falls on the face from about forty-five degrees to one side and a little above
the eyes. On a bright day or in the evening, close the curtains and put the one soft light
in the same place, a large source on a stand, its centre a hand's width above her eyes.
The far side of the face falls off into shadow. No second light, nothing coloured.

The chair sits on the rug, and the desk is to one side or behind, never between her and
the phone. Behind her is the room she works in: books, the upholstered chair, the curtain.
Nothing is turned to camera. No diploma, no copy of the book, no plant brought in. A
clinician is believed on what a clinician sees, and a set says presenter.

The phone goes on a tripod, not propped against a book. A propped phone tilts, and a frame
that looks up at a face reads as confession, down as lecture. The lens is at the height of
her seated eyes, two metres from her face, measured with a tape and then left. Her eyes go
to the lens and nowhere else; there is no monitor to glance at.

## The frame

She sits in the left or right third of the frame, never the centre, eyes about a third of
the way down, clear room above her head. The reason is not taste. The take is recorded at
4K so that a vertical column, full height and a third of the width, can be cut from it for
the Short. In the centre, the column takes her and nothing of the room; in a third it
takes her whole and the master still reads as a room with a person in it.

Tape the column. On whatever she checks the frame with, two strips of masking tape mark a
column 1215 pixels wide on the 3840 frame, against the side she sits on. Head and hands
stay inside the tape. The bottom of the frame belongs to the editor: the cream band with
the source line is composited there afterwards, so nothing in the lower sixth should
matter, and her hands at rest sit above it.

The frame holds her from below the sternum to above the head, the room behind, and the
fall of the light. Not the light itself, the curtain rail, a door, a mirror or a screen.
Plain mid-tone clothing: no fine pattern, no white or cream, no red.

## The phone, with the phone in your hand

Two paths. Choose the second.

Blackmagic Camera is recommended because it is the only free way to fix every value the
production plan fixes, so that takes from different days match and cut together. The
native camera locks focus and exposure but chooses its own shutter and white balance, and
a face that shifts colour between takes cannot be cut.

### Path one: the native camera on a recent iPhone

1. Open Settings, then Camera, then Record Video. Turn on Show PAL Formats; 25 fps
   options join the list.
2. Choose 4K at 25 fps. If no 25 fps option appears, one guide reports that switching
   Formats to Most Compatible, choosing 25 fps, then switching back makes it appear;
   check on the device.
3. Open the Camera app, swipe to Video, and confirm the corner shows 4K and 25.
4. With the frame set and you in it, press and hold on your face on the screen until
   AE/AF LOCK appears at the top. Focus and exposure are now fixed and will not hunt.
5. The native app cannot lock white balance and cannot set a shutter speed. If the light
   changes during a take the colour drifts, and nothing in this app stops it.

### Path two: Blackmagic Camera, free, on iPhone or Android

1. Install Blackmagic Camera from the App Store or Google Play. It is free with no
   in-app purchase. On Android, check the supported device list on Google Play first.
2. In the app's settings, set resolution to 3840 by 2160 and frame rate to 25. Set the
   codec to H.265 unless the editor asks for ProRes, which makes very large files.
3. Set Save to Files, or to In-App and Photo Library, so the clip is a file she can hand
   over by cable or AirDrop. Confirm it appears after the test clip.
4. Tap the shutter value in the heads-up display, set 1/50, and turn its lock on.
5. Tap white balance, choose Manual, set 4500 K, tint 0, and turn its lock on. In
   settings, turn on Lock White Balance on Record as well.
6. Tap ISO and fix a value: the lowest that exposes the face correctly, then left.
7. Tap her face to focus, then switch autofocus off so the lens holds. The spec sheet
   lists an autofocus toggle and a manual focus scale rather than a button labelled lock;
   which control holds focus on her phone, check on the device.
8. Set audio to 48 kHz and confirm the app shows the lavalier as its input.

### Before every take, on either path

Turn on airplane mode, with Wi-Fi and Bluetooth off under it, so no call or notification
lands in a take. Plug the wired lavalier in through the adapter the phone needs, Lightning
or USB-C to 3.5 mm; it must pass a microphone signal, not only headphones. Reports differ
on whether Apple's own USB-C adapter does; check on the device by recording a sentence and
listening back. The capsule clips at the sternum, the cable inside the clothing.

Record a thirty-second test clip, a real sentence from the script at the real volume, then
copy it to a laptop and watch it at full size: the colour of the face, focus holding, the
tape column containing her, nothing humming or echoing, and the clip at 3840 by 2160 and
25 fps. Only then the take.

At the end of the session, before anything is moved, sit still and record ten seconds of
the room with no one speaking. That is room tone; the editor needs it to cover the cuts.

## Sources checked

```
iPhone, Show PAL Formats and 4K 25 fps
  https://www.igeeksblog.com/how-to-record-video-in-pal-format-on-iphone/
  https://www.provideocoalition.com/unlock-the-hidden-25p-mode-in-your-current-iphones-camera-app/
  https://primalvideo.com/video-creation/shooting/best-iphone-camera-settings-for-video
iPhone, AE/AF Lock by touch and hold
  https://iphonelife.com/content/tip-day-why-and-how-use-autofocus-and-auto-exposure-lock-your-iphone-camera
  https://iphonephotographyschool.com/ae-af-lock/
iPhone native app, no manual shutter or white balance
  https://www.cultofmac.com/566763/iphone-camera-manual-controls/
Blackmagic Camera, specifications (free; 25 fps; shutter lock; WB Locked/Auto/Manual 2500 to 10000 K;
Lock White Balance on Record; ISO; autofocus toggle and manual focus; save to Files or Photo Library)
  https://www.blackmagicdesign.com/products/blackmagiccamera/techspecs/W-APP-01
Blackmagic Camera for Android, free, device support
  https://www.digitalcameraworld.com/news/blackmagic-camera-app-comes-to-android-and-it-is-free
  https://androidcentral.com/apps-software/blackmagics-camera-app-comes-to-more-android-phones
Lavalier adapters on USB-C iPhones
  https://discussions.apple.com/thread/256076702
Checked 17 October 2026 through search results; support.apple.com and blackmagicdesign.com
would not open from this machine, so Apple's own wording is unverified.
```
