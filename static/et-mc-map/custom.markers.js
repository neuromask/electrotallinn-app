/*

This is a JavaScript file you can edit to add custom markers to the map.
uNmINeD does not overwrite this file during map generation.

Steps:

    1. Edit this file using Notepad or a code editor (do not use document editors like Microsoft Word)
    2. Change the line "isEnabled: false," to "isEnabled: true," to display the markers
    3. Change or remove the example markers
    4. Add your own markers

Marker format:

    {
        x: X coordinate of the marker (in Minecraft block units),
        z: Z coordinate of the marker (in Minecraft block units),
        image: marker image URL to display (in quotes),
        imageScale: scale of the image (e.g. 1 = display full size, 0.5 = display half size),
        imageAnchor: [0.5, 1] means the tip of the pin is at the center-bottom of the image (see OpenLayers documentation for more info),
        text: marker text do display (in quotes),
        textColor: text color in HTML/CSS format (in quotes),
        offsetX: horizontal pixel offset of the text,
        offsetY: vertical pixel offset of the text,
        font: text font in HTML/CSS format (in quotes),
    },

Things to keep in mind:

* There are opening and closing brackets for each marker "{" and "}"
* Property names are case sensitive (i.e. "textColor" is okay, "TextColor" is not)
* There is a comma (",") at the end of each line except the opening brackets ("{")

You can use https://mapmarker.io/editor to generate custom pin images.
Use the imageScale property if the pin image is too large.

*/

UnminedCustomMarkers = {

    isEnabled: true,

    markers: [

        // Example 2: Marker with text
        {
            x: 1000,
            z: -60,
            image: "custom.pin.png",
            imageAnchor: [0.5, 1],
            imageScale: 0.3,
            text: "ET Base",
            textColor: "white", 
            offsetX: 0,
            offsetY: -50,
            font: "bold 14px Arial,sans serif",
        },
        // Example 2: Marker with text
        {
            x: 250,
            z: 0,
            image: "custom.pin.png",
            imageAnchor: [0.5, 1],
            imageScale: 0.3,
            text: "Spawn / Start",
            textColor: "white", 
            offsetX: 0,
            offsetY: -50,
            font: "bold 14px Arial,sans serif",
        },

        // do not delete the following two closing brackets
    ]
}
