/* 
 * The MIT License
 *
 * Copyright 2014 filippov.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
 
    // https://www.devbridge.com/sourcery/components/jquery-autocomplete/
        var addr = [
		{
			"value": "16-й корпус ТПУ",
			"data": "{\"type\":\"Point\",\"coordinates\":[84.94458081177,56.4613759880866]}"
		},
		{
			"value": "Корпус ТПУ № 16в",
			"data": "{\"type\":\"Point\",\"coordinates\":[84.9446866,56.46118545]}"
		},
		{
			"value": "Общежитие №15 ТПУ",
			"data": "{\"type\":\"Point\",\"coordinates\":[84.9452728220453,56.4619068423774]}"
		},
		{

			"value": "Спортивный корпус ТПУ",
			"data": "{\"type\":\"Point\",\"coordinates\":[84.9465325764151,56.4613464511761]}"
		},
		{
			"value": "9-й корпус ТПУ",
			"data": "{\"type\":\"Point\",\"coordinates\":[84.9474017877876,56.4619381889421]}"
		},
		{
			"value": "Институт природных ресурсов",
			"data": "{\"type\":\"Point\",\"coordinates\":[84.9489312678523,56.456915835102]}"
		}
        ];
        console.log('!');
        $('#srch-term').autocomplete({
            lookup: addr,
            onSelect: function (suggestion) {
                alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
            }
        });
