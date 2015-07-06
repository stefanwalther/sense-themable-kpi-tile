You can use the following properties to define the behavior of this visualization extension:

### Data

For every _Themable KPI Tile_ the following options can be set:

* **`KPI title`** - The title of your KPI
* **`KPI`** - The KPI, any numeric or dual value
* **`KPI comparison (numeric value)`** - The numeric value which is relevant to render the positive, negative or neutral color & icon defined in the template.
* **`KPI comparison (displayed value)`** - Put the formatted comparison value here (use e.g. Qlik's `num` method).

![](docs/images/props_data.png)

### Appearance - Layout

Choose either the **`Default Layout`**, **`Custom Layout`** or choose one of the **`Templates`**.

You can add additional templates by modifying the `layouts.json` file, located under `./config/` by adding new layouts as follows:

```js
"orange": {
    "name": "Orange",
    "tileBackgroundColor": "#FFB304",
    "titleColor": "#fff",
    "comparisonPositiveColor": "#006600",
    "comparisonNegativeColor": "#CC0000",
    "comparisonNeutralColor": "#333",
    "comparisonPositiveIcon": "&#9650;",
    "comparisonNegativeIcon": "&#9660;",
    "comparisonNeutralIcon": "&#9654;"
  }
```

In case of choosing "Custom Layout" the following settings can be used:

* **`Title Background Color`** - Any valid [hex color](http://www.w3schools.com/tags/ref_colorpicker.asp)
* **`Title Color`** - Any valid [hex color](http://www.w3schools.com/tags/ref_colorpicker.asp)
* **`KPI Color`** - Any valid [hex color](http://www.w3schools.com/tags/ref_colorpicker.asp)
* **`Comparison Color`** - Any valid [hex color](http://www.w3schools.com/tags/ref_colorpicker.asp)

![](docs/images/props_appearance.png)