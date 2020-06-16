//
// go fish prequel
//

const jq_extend = require('extend');
const extend = require('util')._extend;
const request = require('request');
const readline = require('readline');

const _ = require('underscore');
const $ = {
  extend: jq_extend
};

//
// /app/assets/javascripts/aq.js
//

function Aq() {
  _.templateSettings = {
    interpolate: /\{\{\=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g
  };
}

Aq.prototype.url_params = function() {
  var query = window.location.search.split('?');
  var result = {};
  if (query.length == 2) {
    var parts = query[1].split('&');
    var result = {};
    aq.each(parts, part => {
      result[part.split('=')[0]] = part.split('=')[1];
    });
  }
  return result;
};

Aq.prototype.template = function(name, args) {
  return $(_.template($('#' + name).html())(args));
};

Aq.prototype.link = function(href, text) {
  return "<a target=_top href='" + href + "'>" + text + '</a>';
};

Aq.prototype.job_link = function(jid) {
  return this.link('/jobs/' + jid, jid);
};

Aq.prototype.metacol_link = function(mid) {
  return this.link('/metacols/' + mid, mid);
};

Aq.prototype.user_link = function(uid, login) {
  if (login) {
    return this.link('/users/' + uid, login);
  } else {
    return '-';
  }
};

Aq.prototype.start_link = function(jid, body) {
  return this.link('/users/' + uid, login);
};

Aq.prototype.group_link = function(gid, name) {
  return this.link('/groups/' + gid, name);
};

Aq.prototype.capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

Aq.prototype.filename = function(path) {
  return path.split('/').slice(-1)[0];
};

Aq.prototype.nice_time = function(date, seconds) {
  var h = date.getHours();
  var m = date.getMinutes();
  var ap = h >= 12 ? 'pm' : 'am';
  h = h % 12;
  h = h ? h : 12;

  m = m < 10 ? '0' + m : m;

  var s;
  if (seconds) {
    s = date.getSeconds();
    s = s < 10 ? '0' + s : s;
    s = ':' + s;
  } else {
    s = '';
  }

  return h + ':' + m + s + ' ' + ap;
};

Aq.prototype.nice_date = function(date) {
  var time = this.nice_time(date, true);
  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  return days[date.getDay()] + ' ' + date.toLocaleDateString() + ', ' + time;
};

Aq.prototype.delete_from_array = function(arr, el) {
  arr.splice($.inArray(el, arr), 1);
};

Aq.prototype.rand_string = function(n) {
  return Array.apply(0, Array(n))
    .map(function() {
      return (function(charset) {
        return charset.charAt(Math.floor(Math.random() * charset.length));
      })('abcdefghijklmnopqrstuvwxyz');
    })
    .join('');
};

Aq.prototype.each = function(array, f) {
  if (array) {
    for (var i = 0; i < array.length; i++) {
      f(array[i], i);
    }
  }
  return this;
};

Aq.prototype.each_in_reverse = function(array, f) {
  if (array) {
    for (var i = array.length - 1; i >= 0; i--) {
      f(array[i], i);
    }
  }
  return this;
};

Aq.prototype.uniq = function(array) {
  var result = [];

  if (array) {
    for (var i = 0; i < array.length; i++) {
      if (result.indexOf(array[i]) < 0) {
        result.push(array[i]);
      }
    }
  }

  return result;
};

Aq.prototype.collect = function(array, f) {
  var result = [];
  if (array) {
    for (var i = 0; i < array.length; i++) {
      result.push(f(array[i], i));
    }
  }
  return result;
};

Aq.prototype.sum = function(array, f) {
  var result = 0;
  if (array) {
    for (var i = 0; i < array.length; i++) {
      result += f(array[i], i);
    }
  }
  return result;
};

Aq.prototype.where = function(array, f) {
  var result = [];
  if (array) {
    for (var i = 0; i < array.length; i++) {
      if (f(array[i])) {
        result.push(array[i]);
      }
    }
  }
  return result;
};

Aq.prototype.find = function(array, f) {
  var results = this.where(array, f);
  if (results.length > 0) {
    return results[0];
  } else {
    return undefined;
  }
};

Aq.prototype.remove = function(array, element) {
  var i = array.indexOf(element);
  if (i > -1) {
    array.splice(i, 1);
  }
  return array;
};

Aq.prototype.range = function(n) {
  var result = [];
  for (var i = 0; i < n; i++) {
    result.push(i);
  }
  return result;
};

Aq.prototype.random_int = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

Aq.prototype.random_list = function(min_length, max_length, min_val, max_val) {
  var len = this.random_int(min_length, max_length);
  var that = this;
  return this.collect(this.range(len), function(i) {
    return that.random_int(min_val, max_val);
  });
};

Aq.prototype.matrix = function(n, m, el) {
  var rows = [];
  if (!el) {
    el = null;
  }
  for (var i = 0; i < n; i++) {
    var col = [];
    for (var j = 0; j < m; j++) {
      col.push(el);
    }
    rows.push(col);
  }
  return rows;
};

Aq.prototype.pluck = function(obj, fields) {
  var result = {};
  o.each(fields, function(f) {
    result[f] = obj[f];
  });
  return result;
};

Aq.prototype.currency = function(num) {
  return (
    '$' +
    parseFloat(num, 10)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      .toString()
  );
};

Aq.prototype.query = function() {
  var query_string = window.location.search.split('?')[1];
  var o = {};

  if (query_string) {
    aq.each(query_string.split('&'), function(p) {
      var key = p.split('=')[0],
        val = p.split('=')[1];
      o[key] = val;
    });
  }

  return o;
};

Aq.prototype.url_path = function() {
  return window.location.pathname.split('/');
};

Aq.prototype.member = function(set, element) {
  return set.indexOf(element) >= 0;
};

Aq.prototype.first = function(list) {
  if (list.length > 0) {
    return list[0];
  } else {
    raise('Could not take first element of empty list.');
  }
};

Aq.prototype.last = function(list) {
  if (list.length > 0) {
    return list[list.length - 1];
  } else {
    raise('Could not take last element of empty list.');
  }
};

aq = new Aq();

//
// app/assets/javascripts/models/aq.js.erb
//

AQ = {
  config: {
    no_items_in_backtrace: false
  }
};

AQ.check_signed_in = function(response) {
  if (
    response.headers().status == 'Not-logged-in' ||
    response.data.error == 'Not-logged-in'
  ) {
    window.location = '/signin';
  } else {
    return response;
  }
};

AQ.init = function(http) {
  AQ.http = http;

  if ('<%= Rails.env %>' == 'development') {
    // Controls whether to spit out query performance information

    AQ.get = function() {
      let start_time = new Date(),
        args = arguments;

      return AQ.http.get.apply(null, args).then(result => {
        let url = Array.from(args)[0],
          elapsed = new Date() - start_time;
        AQ.check_signed_in(result);
        console.log(
          `%cGET %c${url} completed in %c${elapsed} ms`,
          'font-weight: bold',
          'font-weight: normal',
          'color: $selection-highlight-color'
        );
        return result;
      });
    };

    AQ.post = function() {
      let start_time = new Date(),
        args = arguments;

      return AQ.http.post.apply(null, args).then(result => {
        let url = Array.from(args)[0],
          data = JSON.stringify(Array.from(args)[1]).slice(0, 100),
          elapsed = new Date() - start_time;
        AQ.check_signed_in(result);
        console.log(
          `%cPOST %c${url}, ${data} ... completed in %c${elapsed} ms`,
          'font-weight: bold',
          'font-weight: normal',
          'color: $selection-highlight-color'
        );
        return result;
      });
    };

    AQ.put = function() {
      let start_time = new Date(),
        args = arguments;

      return AQ.http.put.apply(null, args).then(result => {
        let url = Array.from(args)[0],
          elapsed = new Date() - start_time;
        AQ.check_signed_in(result);
        console.log(
          `%cPUT %c${url}, completed in %c${elapsed} ms`,
          'font-weight: bold',
          'font-weight: normal',
          'color: $selection-highlight-color'
        );
        return result;
      });
    };
  } else {
    AQ.get = function() {
      let args = arguments;
      return AQ.http.get.apply(null, args).then(AQ.check_signed_in);
    };

    AQ.post = function() {
      let args = arguments;
      return AQ.http.post.apply(null, args).then(AQ.check_signed_in);
    };

    AQ.put = function() {
      let args = arguments;
      return AQ.http.put.apply(null, args).then(AQ.check_signed_in);
    };
  }

  AQ.next_record_id = 0;
  AQ.sample_cache = {}; // used by AQ.Sample.find_by_identifier
  AQ.sample_type_cache = {}; // used by AQ.Sample.find_by_identifier
  AQ.sample_identifier_cache = {}; // used by AQ.to_sample_identifier
};

AQ.get_sample_names = function() {
  return new Promise(function(resolve, reject) {
    AQ.get('/browser/all').then(
      response => {
        AQ.sample_names = response.data;
        resolve(AQ.sample_names);
      },
      response => {
        reject(response.data.errors);
      }
    );
  });
};

AQ.sample_names_for = function(sample_type_name) {
  var samples = [];
  if (sample_type_name) {
    aq.each([sample_type_name], function(type) {
      samples = samples.concat(AQ.sample_names[type]);
    });
  }
  return samples;
};

AQ.to_sample_identifier = function(id) {
  var sid = '' + id + ': Name not found. AQ.sample_names may not be loaded';

  if (AQ.sample_identifier_cache[id]) {
    sid = AQ.sample_identifier_cache[id];
  } else {
    for (var st in AQ.sample_names) {
      aq.each(AQ.sample_names[st], s => {
        var i = parseInt(s.split(': ')[0]);
        if (i == id) {
          sid = s;
          AQ.sample_identifier_cache[id] = s;
        }
      });
    }
  }

  return sid;
};

AQ.id_from = function(sid) {
  var parts;
  if (typeof sid == 'number') {
    return sid;
  } else if (typeof sid != 'string') {
    return undefined;
  } else {
    parts = sid.split(': ');
    if (parts.length > 0) {
      var id = parseInt(parts[0]);
      if (id) {
        return id;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }
};

AQ.sid_from = function(id) {
  // ??
};

AQ.items_for = function(sample_id, object_type_id) {
  return new Promise(function(resolve, reject) {
    AQ.post('/json/items/', { sid: sample_id, oid: object_type_id }).then(
      response => {
        resolve(
          aq.collect(response.data, item => {
            if (item.collection) {
              var i = item;
              i.collection = AQ.Collection.record(i.collection);
              return new AQ.Record(AQ.Item, item);
            } else {
              return new AQ.Record(AQ.Item, item);
            }
          })
        );
      },
      response => {
        reject(response.data.errors);
      }
    );
  });
};

//
// app/assets/javascripts/models/backtrace.js
//

class Step {
  constructor(display, response) {
    let step = this;

    step.display = display;

    aq.each(step.display.content, line => {
      line._id = step.next_line_id;
      if (!AQ.config.no_items_in_backtrace && line.take && line.take.id) {
        AQ.Item.find(line.take.id).then(item => (line.take = item));
      }
    });

    if (response) {
      step.response = response;
    } else {
      step.response = { inputs: {} };
    }
    step.type = step.display.operation;

    if (step.type == 'display') {
      if (!response) {
        step.response = step.new_response();
      } else {
        step.response = step.marshall_response();
      }
    }
  }

  get next_line_id() {
    if (!this.constructor.next_line_id) {
      this.constructor.next_line_id = 0;
    }
    return this.constructor.next_line_id++;
  }

  get ready() {
    let step = this;
    for (var j = 0; j < step.display.content.length; j++) {
      let line = step.display.content[j];
      if (line && line.check && !line.checked) {
        return false;
      }
      if (line && line.table) {
        for (var x = 0; x < line.table.length; x++) {
          for (var y = 0; y < line.table[x].length; y++) {
            if (line.table[x][y].check && !line.table[x][y].checked) {
              return false;
            }
          }
        }
      }
    }
    return true;
  }

  get title() {
    switch (this.type) {
      case 'display':
        if (this.display.content && this.display.content[0].title) {
          return this.display.content[0].title;
        } else {
          return '(Untitled Step)';
        }
        break;
      case 'error':
        return 'Runtime Error';
        break;
      case 'aborted':
        return 'Job Canceled';
        break;
      case 'complete':
        return 'Complete';
    }
  }

  check_all() {
    let step = this;
    for (var j = 0; j < step.display.content.length; j++) {
      let line = step.display.content[j];
      if (line && line.check) {
        line.checked = true;
      }
      if (line && line.table) {
        for (var x = 0; x < line.table.length; x++) {
          for (var y = 0; y < line.table[x].length; y++) {
            if (line.table[x][y].check) {
              line.table[x][y].checked = true;
            }
          }
        }
      }
    }
    return true;
  }

  new_response() {
    let step = this;

    step.response = { in_progress: true, inputs: { table_inputs: [] } };

    for (var j = 0; j < step.display.content.length; j++) {
      let line = step.display.content[j];

      if (line) {
        if (line.select) {
          step.response.inputs[line.select.var] =
            line.select.choices[line.select.default];
        }
        if (line.input) {
          step.response.inputs[line.input.var] = line.input.default;
        }
        if (line.table) {
          step.response.inputs.table_inputs = step.new_table_inputs(line);
        }
      }
    }

    return step.response;
  }

  new_table_inputs(line) {
    var table_inputs = {};

    for (var j = 0; j < line.table.length; j++) {
      for (var k = 0; k < line.table[j].length; k++) {
        if (line.table[j][k].key) {
          if (!table_inputs[line.table[j][k].key]) {
            table_inputs[line.table[j][k].key] = {};
          }
          table_inputs[line.table[j][k].key][line.table[j][k].operation_id] = {
            value: line.table[j][k].default,
            type: line.table[j][k].type,
            row: j - 1 //j is 1-based, we want the row field to be zero based
          };
        }
      }
    }

    return table_inputs;
  }

  marshall_response() {
    // Backend returns [ { opid: __, key: __, value: __, type: __}, ...]
    // Frontend wants { key1: { opid1: { ... }, opid2: { ... } }, key2: { ... } }

    let step = this,
      frontend_table_inputs = {},
      backend_table_inputs;

    if (!step.response.inputs) {
      step.response.inputs = { table_inputs: [] };
    }

    backend_table_inputs = step.response.inputs.table_inputs;

    if (backend_table_inputs) {
      for (var i = 0; i < backend_table_inputs.length; i++) {
        if (!frontend_table_inputs[backend_table_inputs[i].key]) {
          frontend_table_inputs[backend_table_inputs[i].key] = {};
        }
        frontend_table_inputs[backend_table_inputs[i].key][
          backend_table_inputs[i].opid
        ] = {
          value: backend_table_inputs[i].value,
          type: backend_table_inputs[i].type
        };
      }
    }

    step.response.inputs.table_inputs = frontend_table_inputs;

    return step.response;
  }

  // TODO: distinguish table inputs by row, rather than by opid. Then add opid as
  // an optional attribute of that table input.
  // This change will involve touching:
  // the method below
  // new_table_inputs
  // _show_block.html.erb in both operations and technician
  prepare_table_inputs() {
    var backend_table_inputs = [],
      frontend_table_inputs = this.response.inputs.table_inputs;

    for (var key in frontend_table_inputs) {
      for (var opid in frontend_table_inputs[key]) {
        backend_table_inputs.push({
          key: key,
          opid: parseInt(opid),
          row: frontend_table_inputs[key][opid].row,
          value: frontend_table_inputs[key][opid].value,
          type: frontend_table_inputs[key][opid].type
        });
      }
    }

    return backend_table_inputs;
  }

  sendable_response() {
    let inputs = this.response.inputs;
    inputs.table_inputs = this.prepare_table_inputs();
    inputs.timestamp = Date.now() / 1000;
    this.response.inputs = inputs;
    return this.response;
  }

  get timer() {
    for (var i in this.display.content) {
      if (this.display.content[i].timer) {
        return this.display.content[i].timer;
      }
    }
    return undefined;
  }
}

class Backtrace {
  // This should extend array, but the closure compiler used in
  // production doesn't let you do that.

  constructor(state) {
    let backtrace = this;
    backtrace.array = [];

    for (var i = 1; i < state.length; i += 2) {
      if (state[i]) {
        backtrace.array.push(new Step(state[i], state[i + 1]));
      }
    }
  }

  get complete() {
    let backtrace = this;

    return (
      backtrace.array.length > 0 &&
      backtrace.array[backtrace.array.length - 1].display &&
      backtrace.array[backtrace.array.length - 1].display.operation != 'display'
    );
  }

  get length() {
    return this.array.length;
  }

  get last() {
    let backtrace = this;
    return backtrace.array[backtrace.array.length - 1];
  }

  get second_to_last() {
    let backtrace = this;
    return backtrace.array[backtrace.array.length - 2];
  }

  get ready() {
    if (this.last) {
      return this.last.ready;
    } else {
      return false;
    }
  }

  get last_response() {
    var backtrace = this;
    return backtrace.last.sendable_response();
  }
}

//
// app/assets/javascripts/models/base.js
//

AQ.Base = function(model) {
  this.model = model;
  this.record_methods = {};
  this.record_getters = {};
  this.update = function() {};
  this.confirm = function() {
    return true;
  };
};

AQ.Base.prototype.super = function(name) {
  var base = this,
    args = [];
  for (var i = 0; i < arguments.length - 1; i++) args[i] = arguments[i + 1];
  return base.__proto__[name].apply(base, args);
};

AQ.Base.prototype.record = function(extras) {
  let record = new AQ.Record(this, extras);
  if (record.upgrade) {
    record.upgrade(extras);
  }
  return record;
};

AQ.Base.prototype.find = function(id) {
  let base = this;
  // if ( base.model == "Item" ) {
  //   debugger;
  // }
  return new Promise(function(resolve, reject) {
    AQ.post('/json.json', { model: base.model, method: 'find', id: id }).then(
      response => {
        resolve(base.record(response.data));
      },
      response => {
        reject(response.data);
      }
    );
  });
};

AQ.Base.prototype.find_by_name = function(name) {
  var base = this;
  return new Promise(function(resolve, reject) {
    AQ.post('/json', {
      model: base.model,
      method: 'find_by_name',
      arguments: [name]
    }).then(
      response => {
        resolve(base.record(response.data));
      },
      response => {
        reject(response.data.errors);
      }
    );
  });
};

AQ.Base.prototype.array_query = function(method, args, rest, opts = {}) {
  var base = this;
  var options = $.extend({ offset: -1, limit: -1, reverse: false }, opts);
  var query = {
    model: base.model,
    method: method,
    arguments: args,
    options: options
  };

  return new Promise(function(resolve, reject) {
    AQ.post('/json', $.extend(query, rest)).then(
      response => {
        var records = [];
        for (var i = 0; i < response.data.length; i++) {
          records.push(base.record(response.data[i]));
        }
        resolve(records);
      },
      response => {
        reject(response.data);
      }
    );
  });
};

AQ.Base.prototype.all = function(rest = {}, limit = -1, opts = {}) {
  var options = $.extend({ offset: -1, limit: -1, reverse: false }, opts);
  return this.array_query('all', [], rest, options);
};

AQ.Base.prototype.where = function(criteria, methods = {}, opts = {}) {
  var options = $.extend({ offset: -1, limit: -1, reverse: false }, opts);
  return this.array_query('where', criteria, methods, options);
};

AQ.Base.prototype.exec = function(method, args) {
  var base = this;
  return new Promise(function(resolve, reject) {
    AQ.post('/json', {
      model: base.model,
      method: method,
      arguments: args
    }).then(
      response => {
        resolve(response.data);
      },
      response => {
        reject(response.data.errors);
      }
    );
  });
};

AQ.Base.prototype.new = function() {
  var base = this;
  return new Promise(function(resolve, reject) {
    AQ.post('/json', { model: base.model, method: 'new' }).then(
      response => {
        resolve(base.record(response.data));
      },
      response => {
        reject(response.data.errors);
      }
    );
  });
};

AQ.Base.prototype.getter = function(child_model, child_name, id = null) {
  var hidden_name = '_' + child_name,
    id_name = id ? id : child_name + '_id';

  this.record_getters[child_name] = function() {
    var base = this;

    if (base[hidden_name]) {
      return base[hidden_name];
    } else if (base[id_name]) {
      base[hidden_name] = {};
      child_model.find(base[id_name]).then(x => {
        base[hidden_name] = x;
        if (base[hidden_name].location) {
          // This is a hack to get the item popup to properly initialize, since ng-init
          // in the location input box doesn't always work
          base[hidden_name].new_location = base[hidden_name].location;
        }
        AQ.update();
      });
      return null;
    } else {
      return null;
    }
  };
};

AQ.model_names = [
  'Account',
  'User',
  'Group',
  'SampleType',
  'Sample',
  'ObjectType',
  'Item',
  'UserBudgetAssociation',
  'Budget',
  'OperationType',
  'Operation',
  'FieldType',
  'FieldValue',
  'AllowableFieldType',
  'Wire',
  'Parameter',
  'Plan',
  'PlanAssociation',
  'DataAssociation',
  'Job',
  'Upload',
  'Code',
  'Timing',
  'Collection',
  'Library',
  'JobAssociation',
  'Locator',
  'PartAssociation'
];

for (var i = 0; i < AQ.model_names.length; i++) {
  AQ[AQ.model_names[i]] = new AQ.Base(AQ.model_names[i]);
}

//
// app/assets/javascripts/models/bb_allowable_field_type.js
//

AQ.AllowableFieldType.record_methods.upgrade = function() {
  if (this.object_type) {
    this.object_type = AQ.ObjectType.record(this.object_type);
  }
  if (this.sample_type) {
    this.sample_type = AQ.SampleType.record(this.sample_type);
  }
};
//
// app/assets/javascripts/models/budget.js
//

AQ.Budget.record_getters.spent = function() {
  var budget = this;
  delete budget.spent;
  budget.spent = {};

  AQ.get('/budgets/' + budget.id + '/spent').then(response => {
    budget.spent = response.data;
    // AQ.update();
  });

  return budget.spent;
};

//
// Asynchronously returns a list of budget ids corresponding to the year, month and
// user_id given.
//
AQ.Budget.used = function(year, month, user_id = -1) {
  return AQ.get(`/invoices/budgets_used/${year}/${month}/${user_id}`).then(
    result => result.data
  );
};

//
// app/assets/javascripts/models/code.js
//

AQ.Code.getter(AQ.User, 'user');
//
// app/assets/javascripts/models/collection.js
//

AQ.Collection.getter(AQ.ObjectType, 'object_type');

AQ.Collection.record_methods.upgrade = function(raw_data) {
  let collection = this,
    m = raw_data.part_matrix;

  if (m) {
    for (var r = 0; r < m.length; r++) {
      for (var c = 0; c < m[r].length; c++) {
        if (m[r][c]) {
          if (m[r][c].data_associations) {
            m[r][c].data_associations = aq.collect(
              m[r][c].data_associations,
              da => AQ.DataAssociation.record(da)
            );
          }
          m[r][c] = AQ.Item.record(m[r][c]);
        } else {
          m[r][c] = {};
        }
      }
    }
  }

  if (raw_data.object_type) {
    collection.object_type = AQ.ObjectType.record(raw_data.object_type);
  }

  collection.part_matrix = m;
};

AQ.Collection.new_collection = function(collection_type) {
  return AQ.http
    .put(`/collections/${collection_type.id}`)
    .then(response => AQ.Collection.record(response.data));
};

// Creates data associations for any parts that don't have a data association named key.
AQ.Collection.record_methods.extend_data_association = function(key) {
  let collection = this;

  aq.each(collection.part_matrix, row => {
    aq.each(row, part => {
      if (part.record_type == 'Item' && !part.has_data_association(key)) {
        part.new_data_association(key, null);
      }
    });
  });
};

AQ.Collection.record_methods.save_data_associations = function() {
  let collection = this,
    das = [];

  aq.each(collection.parts, part => {
    aq.each(part.data_associations, da => {
      if (da.new_value != da.value) {
        da.set(da.new_value);
        das.push(da);
      }
    });
  });

  return AQ.post('/collections/save_data_associations', {
    data_associations: das
  }).then(result => {
    let updated_das = result.data;
    aq.each(das, da => {
      aq.each(updated_das, updated_da => {
        if (da.rid == updated_da.rid) {
          da.id = updated_da.id;
          da.object = updated_da.object;
          da.updated_at = updated_da.updated_at;
          da.recompute_getter('value');
        }
      });
    });
  });
};

AQ.Collection.record_getters.parts = function() {
  let collection = this,
    part_list = [];
  if (collection.part_matrix) {
    aq.each(collection.part_matrix, row => {
      aq.each(row, part => {
        part_list.push(part);
      });
    });
    return part_list;
  } else {
    return [];
  }
};

AQ.Collection.record_getters.data_keys = function() {
  let collection = this,
    keys = [];

  aq.each(collection.part_matrix, row => {
    aq.each(row, part => {
      aq.each(part.data_associations, da => {
        if (keys.indexOf(da.key) < 0) {
          keys.push(da.key);
        }
      });
    });
  });

  delete collection.data_keys;
  collection.data_keys = keys;
  console.log(keys);
  return collection.data_keys;
};

AQ.Collection.find_fast = function(id) {
  return AQ.get(`/collections/${id}`).then(response =>
    AQ.Collection.record(response.data)
  );
};

AQ.Collection.record_getters.part_keys = function() {
  let collection = this,
    keys = [];

  aq.each(collection.part_matrix, row => {
    aq.each(row, element => {
      aq.each(element.data_associations, da => {
        keys.push(da.key);
      });
    });
  });

  return keys;
};

AQ.Collection.record_methods.store = function() {
  var collection = this;

  AQ.get('/items/store/' + collection.id + '.json')
    .then(response => {
      collection.location = response.data.location;
      collection.new_location = response.data.location;
    })
    .catch(response => {
      alert(response.data.error);
    });
};

AQ.Collection.record_methods.assign_first = function(fv) {
  var r, c;

  for (r = 0; r < this.matrix.length; r++) {
    for (c = 0; c < this.matrix[r].length; c++) {
      if (this.matrix[r][c] == fv.child_sample_id) {
        fv.row = r;
        fv.column = c;
        return fv;
      }
    }
  }

  delete fv.row;
  delete fv.column;

  return fv;
};

AQ.Collection.record_getters.is_collection = function() {
  return true;
};

AQ.Collection.record_getters.selected_pairs = function() {
  let collection = this,
    pairs = [];

  for (var i = 0; i < collection.part_matrix.length; i++) {
    for (var j = 0; j < collection.part_matrix[i].length; j++) {
      if (collection.part_matrix[i][j].selected) {
        pairs.push([i, j]);
      }
    }
  }

  return pairs;
};

AQ.Collection.record_methods.assign_sample_to_selection = function(
  sample_identifier
) {
  let collection = this;

  return AQ.post(`/collections/${collection.id}/assign_sample`, {
    sample_id: AQ.id_from(sample_identifier),
    pairs: collection.selected_pairs
  }).then(response => AQ.Collection.record(response.data));
};

AQ.Collection.record_methods.delete_selection = function() {
  let collection = this;

  return AQ.post(`/collections/${collection.id}/delete_selection`, {
    pairs: collection.selected_pairs
  }).then(response => AQ.Collection.record(response.data));
};

//
// app/assets/javascripts/models/data_association.js
//

AQ.DataAssociation.record_getters.upload = function() {
  var da = this;

  delete da.upload;

  AQ.Upload.where({ id: da.upload_id }, { methods: 'url' }).then(uploads => {
    if (uploads.length > 0) {
      da.upload = uploads[0];
      AQ.update();
    }
  });

  return {};
};

AQ.DataAssociation.record_methods.set = function(value) {
  let da = this,
    temp = {};

  temp[da.key] = value;
  da.object = JSON.stringify(temp);
  da.new_value = value;
  return da;
};

AQ.DataAssociation.record_getters.value = function() {
  var da = this;
  delete da.value;
  da.value = JSON.parse(da.object)[da.key];
  return da.value;
};

AQ.DataAssociation.record_getters.new_value = function() {
  var da = this;
  delete da.new_value;
  da.new_value = da.value;
  return da.new_value;
};

AQ.DataAssociation.record_getters.is_object = function() {
  if (!this.value) {
    return false;
  } else {
    return typeof this.value != 'string';
  }
};

AQ.DataAssociation.record_methods.prepare_and_save = function() {
  let da = this,
    temp = {};

  temp[da.key] = da.new_value;
  da.object = JSON.stringify(temp);

  return da.save();
};

AQ.DataAssociation.base_methods = {
  data_association: function(key) {
    var record = this,
      da = null;
    aq.each(record.data_associations, da => {
      if (da.key == key) {
        rval = da;
      }
    });
    return rval;
  },

  has_data_association: function(key) {
    var record = this,
      rval = false;
    aq.each(record.data_associations, da => {
      if (da.key == key) {
        rval = true;
      }
    });
    return rval;
  },

  new_data_association: function(key, value) {
    let record = this,
      da,
      temp = {},
      klass = record.record_type;

    temp[key] = value;

    da = AQ.DataAssociation.record({
      key: key ? key : 'key',
      object: JSON.stringify(temp),
      parent_class: klass,
      parent_id: record.id,
      unsaved: true
    });

    record.data_associations.push(da);

    return da;
  }
};

AQ.DataAssociation.base_getters = {
  data_associations: function() {
    var record = this;
    delete record.data_associations;

    let klass = record.record_type;
    if (klass == 'Item' || klass == 'Collection') {
      klass = ['Item', 'Collection'];
    }

    AQ.DataAssociation.where({
      parent_id: record.id,
      parent_class: klass
    }).then(das => {
      record.data_associations = das;
      aq.each(record.data_associations, da => {
        da.value = JSON.parse(da.object)[da.key];
        da.upload = AQ.Upload.record(da.upload);
      });
      AQ.update();
    });

    return null;
  }
};
//
// app/assets/javascripts/models/equivalence.js
//

AQ.Plan.equivalence_class_of = function(partition, field_value) {
  for (var i = 0; i < partition.length; i++) {
    if (aq.member(partition[i], field_value)) {
      return partition[i];
    }
  }
  console.log(
    'Could not find eq class of ' +
      field_value.name +
      '(' +
      field_value.role +
      ')'
  );
  return null;
};

AQ.Plan.join = function(sets, partition_1, partition_2) {
  aq.remove(sets, partition_1);
  aq.remove(sets, partition_2);
  sets.push(partition_1.concat(partition_2));
  return sets;
};

AQ.Plan.record_methods.field_values = function() {
  let plan = this,
    fvs = [];
  plan.operations.forEach(op => {
    fvs = fvs.concat(op.field_values);
  });
  return fvs;
};

AQ.Plan.record_methods.equiv = function(
  operation_1,
  field_value_1,
  operation_2,
  field_value_2
) {
  let plan = this;

  if (
    operation_1.rid == operation_2.rid &&
    field_value_1.field_type.routing == field_value_2.field_type.routing &&
    !field_value_1.field_type.array &&
    !field_value_2.field_type.array
  ) {
    return true;
  } else {
    for (var i = 0; i < plan.wires.length; i++) {
      let wire = plan.wires[i];
      if (
        (wire.from == field_value_1 && wire.to == field_value_2) ||
        (wire.from == field_value_2 && wire.to == field_value_1)
      ) {
        return true;
      } else {
      }
    }
  }

  return false;
};

AQ.Plan.record_getters.planned_operations = function() {
  return aq.where(this.operations, op => op.status == 'planning');
};

AQ.Plan.record_methods.classes = function() {
  let plan = this,
    fvs = plan.field_values(),
    num = fvs.length,
    sets = aq.collect(fvs, fv => [fv]),
    changed = true;

  while (changed) {
    changed = false;
    plan.planned_operations.forEach(operation_1 => {
      plan.planned_operations.forEach(operation_2 => {
        operation_1.field_values.forEach(field_value_1 => {
          operation_2.field_values.forEach(field_value_2 => {
            if (field_value_1 != field_value_2) {
              let class_1 = AQ.Plan.equivalence_class_of(sets, field_value_1);
              let class_2 = AQ.Plan.equivalence_class_of(sets, field_value_2);
              if (
                plan.equiv(
                  operation_1,
                  field_value_1,
                  operation_2,
                  field_value_2
                ) &&
                class_1 &&
                class_2 &&
                class_1 != class_2
              ) {
                sets = AQ.Plan.join(sets, class_1, class_2);
                changed = true;
              }
            }
          });
        });
      });
    });
  }

  return sets;
};

/**
 * Assigns the given field value to the sample, and makes all other assignments
 * that are implied by wires, routing, or inventory information. Ignores samples
 * associated with active operations.
 * @method assign
 * @param {FieldValue} field_value
 * @param {Sample} sample
 * @return A promise that resolves once all implied assignments are made.
 */
AQ.Plan.record_methods.assign = function(field_value, sample) {
  let plan = this;

  plan.field_values().forEach(fv => (fv.marked = false));
  plan.mark_leaves();
  plan.equivalences = plan.classes();

  return plan.assign_aux(field_value, sample);
};

AQ.Plan.record_methods.assign_aux = function(field_value, sample) {
  let plan = this,
    promise = Promise.resolve();

  // console.log(
  //   "assign_aux",
  //   plan.parent_operation(field_value).operation_type.name + ", " +
  //   field_value.name + ": ",
  //   aq.collect(AQ.Plan.equivalence_class_of(plan.equivalences, field_value), e => e.name + "(" + e.role + ")").join(", ")
  // )

  AQ.Plan.equivalence_class_of(plan.equivalences, field_value).forEach(
    other_field_value => {
      if (!other_field_value.marked) {
        other_field_value.marked = true;
        other_field_value.assign(sample);
        promise = promise.then(() =>
          plan
            .parent_operation(other_field_value)
            .instantiate(plan, other_field_value, sample.identifier)
        );
      }
    }
  );

  return promise.then(() => plan);
};

AQ.Operation.record_methods.instantiate = function(plan, field_value, sid) {
  let operation = this;

  return Promise.resolve()
    .then(() => AQ.Sample.find_by_identifier(sid))
    .then(sample => {
      let sub_promise = Promise.resolve();

      operation.field_values.forEach(operation_field_value => {
        if (
          !operation_field_value.field_type.array &&
          operation_field_value.routing == field_value.routing
        ) {
          operation.assign_sample(operation_field_value, sid);
        }

        if (operation_field_value != field_value) {
          if (!sample.sample_type.field_types) {
            raise('No field types defined for sample ' + sample.name);
          }

          sample.sample_type.field_types.forEach(sample_field_type => {
            if (sample_field_type.name == operation_field_value.name) {
              let sample_field_value = sample.field_value(
                sample_field_type.name
              );
              if (sample_field_value && sample_field_value.child_sample_id) {
                (function(ofv) {
                  sub_promise = sub_promise
                    .then(() =>
                      AQ.Sample.find_by_identifier(
                        sample_field_value.child_sample_id
                      )
                    )
                    .then(child_sample => plan.assign_aux(ofv, child_sample));
                })(operation_field_value);
              } else if (operation_field_value.routing != field_value.routing) {
                operation.assign_sample(operation_field_value, null);
              }
            }
          });
        }
      });

      return sub_promise;
    });
};

AQ.Plan.record_methods.mark_leaves = function() {
  let plan = this;

  plan.operations.forEach(operation => {
    operation.outputs.forEach(o => (o.leaf = false));
    operation.inputs.forEach(i => (i.leaf = true));
  });

  plan.wires.forEach(wire => (wire.to.leaf = false));

  return plan;
};

//
// app/assets/javascripts/models/field_type.js
//

AQ.FieldType.record_methods.sample_type_names = function() {
  var ft = this;
  return aq.collect(
    aq.where(ft.allowable_field_types, function(aft) {
      return aft.sample_type;
    }),
    function(aft) {
      return aft.sample_type.name;
    }
  );
};

AQ.FieldType.record_methods.chosen_sample_type_name = function() {
  var ft = this;

  for (var i = 0; i < ft.allowable_field_types.length; i++) {
    if (ft.allowable_field_types[i].id == ft.aft_choice) {
      if (ft.allowable_field_types[i].sample_type) {
        return ft.allowable_field_types[i].sample_type.name;
      } else {
        return null;
      }
    }
  }

  return null;
};

AQ.FieldType.record_methods.matches = function(field_value) {
  return field_value.role === this.role && field_value.name === this.name;
};

AQ.FieldType.record_methods.can_produce = function(fv) {
  var ft = this;
  var rval = false;

  if (ft.ftype === 'sample' && fv.field_type.ftype === 'sample') {
    aq.each(ft.allowable_field_types, aft => {
      if (!fv.aft) {
        if (!fv.corrupt) {
          add_designer_message(
            `Warning. field value '${fv.name}' has no allowable types. This plan may have been corrupted due to altered i/o definitions.`
          );
          fv.corrupt = true;
        }
      } else if (
        fv.aft.sample_type_id === aft.sample_type_id &&
        fv.aft.object_type_id === aft.object_type_id &&
        Number(fv.field_type.part) === Number(ft.part)
      ) {
        // Note, Number is used to compare null and false.
        // Could also use !!
        rval = true;
      }
    });
  } else {
    rval = false;
  }

  return rval;
};

AQ.FieldType.record_methods.can_consume =
  AQ.FieldType.record_methods.can_produce;

AQ.FieldType.record_getters.choices_array = function() {
  var ft = this;
  delete ft.choices_array;
  if (ft.choices) {
    ft.choices_array = ft.choices.split(',');
  } else {
    ft.choices_array = [];
  }
  return ft.choices_array;
};

AQ.FieldType.record_getters.predecessors = function() {
  var ft = this;
  var preds = [];

  delete ft.predecessors;

  aq.each(AQ.operation_types, ot => {
    aq.each(ot.field_types, other_ft => {
      if (other_ft.role == 'output') {
        aq.each(ft.allowable_field_types, aft => {
          aq.each(other_ft.allowable_field_types, other_aft => {
            if (
              aft.sample_type_id == other_aft.sample_type_id &&
              aft.object_type_id == other_aft.object_type_id &&
              Number(ft.part) == Number(other_ft.part)
            ) {
              // Note, Number is used to compare null and false
              preds.push({ operation_type: ot, field_type: other_ft });
            }
          });
        });
      }
    });
  });

  ft.predecessors = preds;

  return preds;
};

//
// app/assets/javascripts/models/field_value.js
//

AQ.FieldValue.getter(AQ.Item, 'item', 'child_item_id');

AQ.FieldValue.record_getters.is_part = function() {
  return this.row != null && this.column != null;
};

AQ.FieldValue.record_getters.part = function() {
  let fv = this;

  if (fv.is_part) {
    delete fv.part;

    AQ.PartAssociation.where(
      {
        collection_id: fv.child_item_id,
        row: fv.row,
        column: fv.column
      },
      {
        include: 'part'
      }
    ).then(pas => {
      if (pas.length == 1) {
        fv.part = pas[0].part;
      } else {
        fv.part = null;
      }
    });

    return undefined;
  } else {
    return undefined;
  }
};

AQ.FieldValue.record_getters.is_sample = function() {
  return this.field_type.ftype == 'sample';
};

AQ.FieldValue.record_getters.is_param = function() {
  return this.field_type.ftype != 'sample';
};

// field type names are case insensitive, but don't want to deal with locales here
AQ.FieldValue.record_getters.is_option = function() {
  return this.is_json && (this.name === 'Options' || this.name === 'options');
};

AQ.FieldValue.record_getters.is_json = function() {
  return this.field_type.ftype === 'json';
};

AQ.FieldValue.record_getters.type = function() {
  return this.field_type.ftype;
};

AQ.FieldValue.record_getters.num_wires = function() {
  delete this.num_wires;
  this.num_wires = 0;
  return 0;
};

AQ.FieldValue.record_getters.wired = function() {
  return this.num_wires > 0;
};

AQ.FieldValue.record_getters.predecessors = function() {
  var fv = this;
  var preds = [];

  aq.each(AQ.operation_types, function(ot) {
    aq.each(ot.field_types, function(ft) {
      if (ft.role === 'output' && ft.can_produce(fv)) {
        preds.push({ operation_type: ot, output: ft });
      }
    });
  });

  delete fv.predecessors;
  fv.predecessors = preds;
  return preds;
};

AQ.FieldValue.record_getters.successors = function() {
  var fv = this;
  var sucs = [];

  aq.each(AQ.operation_types, function(ot) {
    aq.each(ot.field_types, function(ft) {
      if (ft.role == 'input' && ft.can_consume(fv)) {
        sucs.push({ operation_type: ot, input: ft });
      }
    });
  });

  delete fv.successors;
  fv.successors = sucs;
  return sucs;
};

AQ.FieldValue.record_getters.is_wired_to = function() {
  var fv = this;
  return function(wire) {
    return wire.to == fv;
  };
};

AQ.FieldValue.record_methods.reload = function() {
  var fv = this;
  AQ.FieldValue.find(fv.id).then(updated_fv => {
    fv.child_item_id = updated_fv.child_item_id;
    fv.row = updated_fv.row;
    fv.column = updated_fv.column;
    fv.recompute_getter('item');
  });
};

AQ.FieldValue.record_methods.route_compatible = function(other_fv) {
  var fv = this;
  return (
    (!other_fv.array && !fv.array && other_fv.routing == fv.routing) ||
    (other_fv.array &&
      fv.array &&
      other_fv.sample_identifier == fv.sample_identifier)
  );
};

AQ.FieldValue.record_methods.clear_item = function() {
  var fv = this;

  delete fv.child_item;
  delete fv.child_item_id;
  delete fv.row;
  delete fv.column;
  return fv;
};

AQ.FieldValue.record_methods.clear = function() {
  console.log(
    "WARNING: Called FieldValue:clear(), which doesn't do anything anymore"
  );
  return this;
};

AQ.FieldValue.record_methods.choose_item = function(items) {
  let fv = this;

  // Only choose an item if one is not already chosen
  if (
    items.length > 0 &&
    (!fv.child_item_id ||
      !aq.member(
        aq.collect(items, i => i.id),
        fv.child_item_id
      ))
  ) {
    delete fv.items;
    fv.items = items;
    if (fv.role == 'input' && fv.num_wires == 0) {
      if (!items[0].collection) {
        fv.child_item_id = items[0].id;
      } else {
        if (
          !fv.child_item_id ||
          fv.row == null ||
          fv.row == undefined ||
          !fv.column == null ||
          fv.column == undefined
        ) {
          fv.child_item_id = items[0].collection.id;
          items[0].collection.assign_first(fv);
        }
      }
    }
  }

  return fv.child_item_id;
};

AQ.FieldValue.record_methods.find_items = function(sid) {
  var fv = this;
  var promise = Promise.resolve();
  var sample_id = typeof sid === 'string' ? AQ.id_from(sid) : sid;

  if (!sample_id) {
    sample_id = fv.child_sample_id;
  }

  if (fv.field_type.ftype === 'sample' && sample_id) {
    promise = promise
      .then(() => AQ.items_for(sample_id, fv.aft.object_type_id))
      .then(items => (fv.items = items))
      .then(() => {
        // if the fv's item has been deleted, then it needs to be added to the list of items
        // so that choose_item chooses it
        if (
          fv.child_item_id &&
          !aq.member(
            aq.collect(fv.items, i => i.id),
            fv.child_item_id
          )
        ) {
          return AQ.Item.find(fv.child_item_id).then(item =>
            fv.items.push(item)
          );
        }
      })
      .then(() => fv.choose_item(fv.items))
      .then(() => AQ.update());
  } else {
    fv.items = [];
  }

  return promise;
};

AQ.FieldValue.record_methods.assign_item = function(item) {
  let fv = this;
  fv.child_item_id = item.id;
  fv.child_item = item;
};

AQ.FieldValue.record_getters.items = function() {
  var fv = this;

  delete fv.items;

  if (fv.child_sample_id) {
    fv.find_items('' + fv.child_sample_id);
  } else {
    fv.items = [];
  }

  return fv.items;
};

AQ.FieldValue.record_getters.sample = function() {
  var fv = this;
  delete fv.sample;

  if (fv.sid && typeof fv.sid == 'string') {
    AQ.Sample.find(fv.sid.split(': ')[0]).then(s => {
      fv.sample = s;
    });
  } else if (fv.child_sample_id) {
    AQ.Sample.find(fv.child_sample_id).then(s => {
      fv.sample = s;
    });
  } else {
    console.log("Warning: fv.sid = '" + fv.sid + "'");
  }
  return undefined;
};

AQ.FieldValue.record_methods.preferred_predecessor = function(operation) {
  var fv = this;
  var preds = aq.where(fv.predecessors, p => {
    return p.operation_type.id == fv.field_type.preferred_operation_type_id;
  });
  if (preds.length == 1) {
    return preds[0];
  } else {
    return null;
  }
};

AQ.FieldValue.record_methods.samp_id = function(operation) {
  var fv = this;

  if (fv.field_type.array) {
    return fv.sample_identifier;
  } else {
    return operation.routing[fv.routing];
  }
};

AQ.FieldValue.record_methods.valid = function() {
  var fv = this;
  var v = false;

  fv.message = null;

  if (fv.field_type.ftype !== 'sample') {
    // This fv is a paramter
    // Return false unless it has a value
    v = !!fv.value;
    if (!v) {
      fv.message = `${fv.name} parameter not defined`;
    }
  } else if (fv.aft && fv.aft.sample_type_id) {
    // This fv specifies a sample type
    // Make sure it has an associated sample
    // Also make sure it is not a leaf, is not an input, or has an item associated with it
    v =
      !!fv.child_sample_id &&
      (fv.num_wires > 0 || fv.role === 'output' || !!fv.child_item_id);
    if (!v) {
      fv.message = `${fv.name} invalid. sample: ${fv.child_sample_id}, wires: ${fv.num_wires}, role: ${fv.role}, item :${fv.child_item_id}`;
    }
  } else {
    // This fv does not specify a sample type (i.e. it is a container with a handler != sample_container)
    // In this case, make sure it is not a leaf, not an input, or has an item associated with it
    v = fv.num_wires > 0 || fv.role === 'output' || !!fv.child_item_id;
    if (!v) {
      fv.message = `${fv.name} invalid. wires: ${fv.num_wires}, role: ${fv.role}, item :${fv.child_item_id}`;
    }
  }

  if (
    fv.role === 'input' &&
    fv.num_wires === 0 &&
    fv.field_type.part &&
    (typeof fv.row !== 'number' || typeof fv.column !== 'number')
  ) {
    // Return false it the fv is a collection part but its row and/or column are not defined
    v = false;
    if (!v) {
      fv.message = `${fv.name} is part of a collection but has either no row or column defined`;
    }
  }

  return v;
};

AQ.FieldValue.record_methods.empty = function() {
  var fv = this;
  return fv.child_sample_id;
};

AQ.FieldValue.record_methods.assign = function(sample) {
  let field_value = this;

  if (sample) {
    field_value.child_sample_id = sample.id;
    field_value.child_item_id = null;
    field_value.sid = sample.identifier;

    if (field_value.field_type && field_value.field_type.array) {
      field_value.sample_identifier = sample.identifier;
    }
  } else {
    field_value.child_sample_id = null;
    field_value.sid = null;
    field_value.sample_identifier = null;
    field_value.child_item_id = null;
  }

  return field_value;
};

//
// app/assets/javascripts/models/importer.js
//

class Importer {
  constructor(content) {
    this.content = content;
    this.arrange();
    this.find_existing();
  }

  arrange() {
    this.operation_types = [];
    this.libraries = [];
    this.sample_types = [];
    this.object_types = [];
    this.config = this.content.config;

    aq.each(this.content.components, member => {
      if (member.library) {
        this.libraries.push(member.library);
      } else {
        this.operation_types.push(member.operation_type);
        aq.each(member.sample_types, st => {
          if (
            aq.where(this.sample_types, est => est.name == st.name).length == 0
          ) {
            this.sample_types.push(st);
          }
        });
        aq.each(member.object_types, ot => {
          if (
            aq.where(this.object_types, eot => eot.name == ot.name).length == 0
          ) {
            this.object_types.push(ot);
          }
        });
      }
    });

    return this;
  }

  find_existing_aux(components, model) {
    aq.each(components, comp => {
      let where = { name: comp.name };
      if (comp.category) {
        where.category = comp.category;
      }

      model.where(where).then(existing_comps => {
        if (existing_comps.length >= 1) {
          comp.existing = existing_comps[0];
        } else {
          comp.existing = null;
        }
        AQ.update();
      });
    });
  }

  find_existing() {
    this.find_existing_aux(this.operation_types, AQ.OperationType);
    this.find_existing_aux(this.libraries, AQ.Library);
    this.find_existing_aux(this.sample_types, AQ.SampleType);
    this.find_existing_aux(this.object_types, AQ.ObjectType);
  }
}

//
// app/assets/javascripts/models/item.js
//

AQ.Item.getter(AQ.ObjectType, 'object_type');
AQ.Item.getter(AQ.Sample, 'sample');

AQ.Item.record_getters.is_collection = function() {
  return this.object_type.handler === 'collection';
};

AQ.Item.record_getters.is_part = function() {
  return this.object_type && this.object_type.name === '__Part';
};

AQ.Item.record_getters.is_deleted = function() {
  return this.location === 'deleted';
};

// TODO: this method is supposed to be a getter, but uses a promise
AQ.Item.record_getters.collection = function() {
  let item = this;
  if (item.is_part) {
    delete item.collection;
    AQ.PartAssociation.where(
      { part_id: item.id },
      { include: { collection: { include: 'object_type' } } }
    )
      .then(pas => {
        if (pas.length == 1) {
          item.collection = pas[0].collection;
          item.row = pas[0].row;
          item.column = pas[0].column;
          AQ.update();
        }
      })
      .catch(error => console.log('Error: ' + error['errors']));
  } else {
    return undefined;
  }
};

AQ.Item.record_methods.upgrade = function(raw_data) {
  let item = this;

  if (raw_data.sample) {
    item.sample = AQ.Sample.record(item.sample);
  }

  if (raw_data.object_type) {
    item.object_type = AQ.ObjectType.record(item.object_type);
  }

  item.new_location = item.location;

  // item.recompute_getter("data_associations")
};

AQ.Item.record_getters.url = function() {
  delete this.url;
  return (this.url = "<a href='/items/" + this.id + "'>" + this.id + '</a>');
};

AQ.Item.record_methods.move = function(new_location) {
  var item = this;

  AQ.get('/items/move/' + item.id + '?location=' + new_location).then(
    response => {
      if (response.data.message) {
        item.location = new_location;
      } else if (response.data.error) {
        item.new_location = item.location;
        alert(response.data.error);
      }
    }
  );
};

AQ.Collection.record_methods.move = AQ.Item.record_methods.move;

AQ.Item.record_getters.matrix = function() {
  var item = this;
  delete item.matrix;

  AQ.get(`/collections/${item.id}/raw_matrix`).then(response => {
    item.matrix = response.data;
  });

  return item.matrix;
};

AQ.Item.record_methods.store = function() {
  var item = this;

  AQ.get('/items/store/' + item.id + '.json')
    .then(response => {
      item.location = response.data.location;
      item.new_location = response.data.location;
    })
    .catch(response => {
      alert(response.data.error);
    });
};

AQ.Item.record_methods.mark_as_deleted = function() {
  var item = this;

  AQ.http
    .delete('/items/' + item.id + '.json')
    .then(response => {
      item.location = 'deleted';
      item.new_location = 'deleted';
    })
    .catch(response => {
      alert(response.data);
    });
};

AQ.Collection.record_methods.mark_as_deleted =
  AQ.Item.record_methods.mark_as_deleted;

AQ.Item.record_methods.get_history = function() {
  var item = this;

  return AQ.get('/items/history/' + item.id).then(response => {
    delete item.history;
    item.history = response.data;
    aq.each(item.history, h => {
      h.field_value = AQ.FieldValue.record(h.field_value);
      h.operation = AQ.Operation.record(h.operation);
      h.jobs = aq.collect(h.operation.jobs, job => {
        return AQ.Job.record(job);
      });
    });
    return item.history;
  });
};

AQ.Item.record_getters.history = function() {
  var item = this;
  delete item.history;
  item.get_history();
  return item.history;
};

AQ.Item.record_getters.jobs = function() {
  var item = this;
  delete item.jobs;
  item.jobs = [];

  function remove_dups(joblist) {
    let list = [];
    aq.each(joblist, job => {
      if (aq.where(list, x => x.id == job.id).length == 0) {
        list.push(job);
      }
    });
    return list;
  }

  item.get_history().then(history => {
    aq.each(history, h => {
      item.jobs = item.jobs.concat(h.jobs);
    });
    item.jobs = remove_dups(item.jobs);
  });

  return item.jobs;
};

AQ.Collection.record_methods.get_history = AQ.Item.record_methods.get_history;
AQ.Collection.record_getters.history = AQ.Item.record_getters.history;
AQ.Collection.record_getters.jobs = AQ.Item.record_getters.jobs;

//
// app/assets/javascripts/models/job.js
//

AQ.Job.record_methods.upgrade = function(raw_data) {
  var job = this;

  if (!job.state) {
    return [];
  }

  try {
    // TODO: why do the replace? creates malformed JSON in case where attempt to do math with Infinity in protocol
    job.state = JSON.parse(job.state.replace(/Infinity/g, '"Inf"'));
    job.state.index = job.backtrace.length - 1;
  } catch (e) {
    // console.log("Could not parse job state: " + e);
    job.state = [
      {},
      {
        operation: 'error',
        message:
          'Aquarium could not parse the state of this job and cannot proceed: ' +
          e
      },
      {
        operation: 'next',
        inputs: {}
      }
    ];
  }

  if (raw_data.job_associations) {
    delete job.operations;
    job.operations = aq.collect(raw_data.job_associations, ja => {
      let op = AQ.Operation.record(ja.operation);
      return op;
    });
  }

  if (raw_data.user) {
    delete user;
    job.user = AQ.User.record(raw_data.user);
  }

  return job;
};

AQ.Job.record_getters.type = function() {
  let job = this;
  if (job.operations && job.operations.length > 0) {
    if (job.operations[0].operation_type) {
      return job.operations[0].operation_type.name;
    }
  }
  return 'Unknown';
};

AQ.Job.record_getters.url = function() {
  delete this.url;
  return (this.url = "<a href='/jobs/" + this.id + "'>" + this.id + '</a>');
};

AQ.Job.getter(AQ.User, 'user');

AQ.Job.record_getters.started = function() {
  return this.pc != -1;
};

AQ.Job.record_methods.debug = function() {
  return AQ.http.get('/krill/debug/' + this.id);
};

AQ.Job.record_getters.status = function() {
  delete this.status;

  if (this.pc == -2) {
    this.status = 'done';
  } else if (this.pc == -1) {
    this.status = 'pending';
  } else {
    this.status = 'running';
  }

  return this.status;
};

AQ.Job.record_getters.operations = function() {
  let job = this;
  delete job.operations;
  AQ.JobAssociation.where({ job_id: job.id }).then(jas => {
    let ids = aq.collect(jas, ja => ja.operation_id);
    AQ.Operation.where(
      { id: ids },
      { include: 'operation_type', methods: ['data_associations'] }
    ).then(ops => {
      aq.each(ops, op => {
        op.data_associations = aq.collect(op.data_associations, da => {
          AQ.DataAssociation.record(da);
          if (da.upload_id) {
            da.upload = AQ.Upload.record(da.upload);
          }
          return da;
        });
      });
      job.operations = ops;
      AQ.update();
    });
  });
};

AQ.Job.record_getters.uploads = function() {
  let job = this;
  delete job.uploads;

  AQ.Upload.where({ job_id: job.id }).then(uploads => {
    job.uploads = uploads;
    AQ.update();
  });
};

AQ.Job.record_getters.backtrace = function() {
  var job = this;
  delete job.backtrace;
  job.backtrace = new Backtrace(job.state);
  return job.backtrace;
};

AQ.Job.record_getters.is_complete = function() {
  var job = this;
  return job.backtrace && job.backtrace.complete;
};

AQ.Job.record_methods.advance = function() {
  var job = this;

  job.sending = true;

  return new Promise(function(resolve, reject) {
    AQ.http
      .post(
        '/krill/next?command=next&job=' + job.id,
        job.backtrace.last_response
      )
      .then(
        response => {
          let result = response.data.result;

          job.state = response.data.state;
          job.recompute_getter('backtrace');
          job.state.index = job.backtrace.length - 1;
          if (job.backtrace.array[job.state.index].type == 'aborted') {
            job.state.index -= 1;
          }

          job.sending = false;

          resolve();
        },
        response => {
          job.sending = false;

          reject(response.data);
        }
      );
  });
};

AQ.Job.record_methods.abort = function() {
  let job = this;

  return new Promise(function(resolve, reject) {
    AQ.http.get('/krill/abort?job=' + job.id).then(response => {
      resolve(response.data.result);
    });
  });
};

AQ.Job.active_jobs = function() {
  // TODO: make this handle error
  return new Promise(function(resolve, reject) {
    AQ.http.get('/krill/jobs').then(response => {
      resolve(response.data.jobs);
    });
  });
};

//
// app/assets/javascripts/models/job_association.js
//

AQ.JobAssociation.record_methods.upgrade = function() {
  var ja = this;

  if (ja.job) {
    ja.job = AQ.Job.record(ja.job);
  }

  if (ja.operation) {
    ja.operation = AQ.Job.record(ja.operation);
  }

  return ja;
};
//
// app/assets/javascripts/models/job_report.js
//

class JobReport {
  constructor(data, status, date) {
    let job_report = this;

    job_report.status = status;
    job_report.selection = null;

    (job_report.min = 0), (job_report.max = 17 * 60);

    job_report.jobs = aq.collect(data, j => {
      let job = AQ.Job.record(j);
      return job;
    });

    for (var i = 0; i < job_report.jobs.length; i++) {
      let job = job_report.jobs[i];
      if (job.state.length >= 3) {
        job.started_at = job.state[2].time;
      } else {
        job.started_at = job.state[0].time;
      }
      job.left = this.minutes(job.started_at);
      job.started_same_day = this.is_same_day(job.started_at, date);
      job.updated_same_day = this.is_same_day(job.updated_at, date);
    }

    job_report.jobs = aq.where(
      job_report.jobs,
      job =>
        this.is_same_day(job.started_at, date) ||
        this.is_same_day(job.updated_at, date)
    );

    // sort by start time to find mins and maxes
    job_report.jobs.sort((a, b) => a.left - b.left);

    let min_list = aq.collect(job_report.jobs, job =>
      job.started_same_day ? job.left : this.minutes(job.updated_at)
    );

    min_list.sort((a, b) => a - b);

    if (job_report.jobs.length > 0) {
      job_report.min = Math.floor(min_list[0] / 60) * 60 - 60;
      job_report.max =
        Math.ceil(min_list[job_report.jobs.length - 1] / 60) * 60 + 60;
      job_report.selection = job_report.jobs[0];
    }

    // re-sort to deal with jobs that started on different days, for display
    job_report.jobs.sort((a, b) => {
      if (a.started_same_day && b.started_same_day) {
        return a.left - b.left;
      } else if (!a.started_same_day && b.started_same_day) {
        return this.minutes(a.updated_at) - b.left;
      } else if (a.started_same_day && !b.started_same_day) {
        return a.left - this.minutes(b.updated_at);
      } else {
        return this.minutes(a.updated_at) - this.minutes(b.updated_at);
      }
    });

    let top = 28;

    for (var i = 0; i < job_report.jobs.length; i++) {
      let job = job_report.jobs[i];
      job.top = top;
      job.height = 20; // 22 * job.operations.length - 2;
      top += 22; // 22 * job.operations.length;
      job.width = Math.max(5, this.minutes(job.updated_at) - job.left);
      if (!job.started_same_day) {
        job.width = Math.max(5, this.minutes(job.updated_at) - job_report.min);
        job.left = 0;
      } else if (!job.updated_same_day) {
        job.width = Math.max(5, 24 * 60 - job.left + 5);
        job.left -= job_report.min;
      } else {
        job.left -= job_report.min;
      }
      let errors = aq.where(job.operations, op => op.status == 'error');
      job.error_rate = errors.length / job.operations.length;
      job.color = `rgb(${255 * job.error_rate},${255 *
        (1 - job.error_rate)},0)`;
    }

    job_report.hour_boxes = [];

    if (job_report.jobs.length > 0) {
      for (var x = job_report.min; x < 24 * 60; x += 60) {
        job_report.hour_boxes.push({
          top: 0,
          left: x - job_report.min,
          width: 60,
          hour: x / 60 <= 12 ? x / 60 : x / 60 - 12,
          height: job_report.jobs[job_report.jobs.length - 1].top + 42
        });
      }
    }
  }

  minutes(date_string) {
    let d = new Date(date_string);
    return d.getMinutes() + 60 * d.getHours();
  }

  is_same_day(date_string, report_date) {
    let d = new Date(date_string),
      date = new Date(report_date);
    return (
      d.getDate() == date.getDate() &&
      d.getMonth() == date.getMonth() &&
      d.getFullYear() == date.getFullYear()
    );
  }
}
//
// app/assets/javascripts/models/library.js
//

AQ.Library.record_methods.code = function(component_name) {
  let lib = this;

  delete lib[component_name];
  lib[component_name] = {
    content: 'Loading ' + component_name,
    name: 'name',
    no_edit: true
  };

  AQ.Code.where({
    parent_class: 'Library',
    parent_id: lib.id,
    name: component_name
  }).then(codes => {
    if (codes.length > 0) {
      lib[component_name] = codes[codes.length - 1];
    } else {
      lib[component_name] = { content: '# Add code here.', name: 'name' };
    }
    AQ.update();
  });

  return lib[component_name];
};

AQ.Library.record_getters.source = function() {
  return this.code('source');
};

AQ.Library.record_getters.versions = function() {
  let lib = this;
  delete lib.versions;

  lib.versions = {
    source: []
  };

  AQ.Code.where({
    parent_class: 'Library',
    parent_id: lib.id,
    name: 'source'
  }).then(list => {
    lib.versions = {
      source: list.reverse()
    };
    AQ.update();
  });

  return lib.versions;
};
//
// app/assets/javascripts/models/locator.js
//

AQ.Locator.getter(AQ.Item, 'item');

AQ.Locator.record_methods.upgrade = function(raw_data) {
  let locator = this;

  if (raw_data.item) {
    locator.item = AQ.Item.record(raw_data.item);
  }
};
//
// app/assets/javascripts/models/marshall.js
//

AQ.OperationType.record_methods.marshall = function() {
  var ot = this;

  ot.field_types = aq.collect(ot.field_types, rft => {
    var ft = AQ.FieldType.record(rft);
    ft.allowable_field_types = aq.collect(ft.allowable_field_types, raft => {
      var aft = AQ.AllowableFieldType.record(raft);
      aft.sample_type = AQ.SampleType.record(aft.sample_type);
      aft.object_type = AQ.ObjectType.record(aft.object_type);
      return aft;
    });
    return ft;
  });

  return ot;
};

function find_aft(aft_id, ot) {
  var ids = [];
  var rval = null;
  aq.each(ot.field_types, ft => {
    aq.each(ft.allowable_field_types, aft => {
      ids.push(aft.id);
      if (aft_id == aft.id) {
        rval = aft;
      }
    });
  });
  if (!rval) {
    console.log('Could not find ' + aft_id + ' in ' + ids.join(','));
  }
  return rval;
}

AQ.Operation.record_methods.marshall = function() {
  // This code is somewhat redundant with AQ.Operation.record_methods.set_type, but different enough
  // that much of that menthod is repeated here.

  let op = this;

  op.routing = {};
  op.form = { input: {}, output: {} };
  if (!AQ.id_map) {
    AQ.id_map = [];
  }

  // op.operation_type = AQ.OperationType.record(op.operation_type).marshall();
  var ots = aq.where(
    AQ.operation_types,
    ot => ot.deployed && ot.id == op.operation_type_id
  );

  if (ots.length != 1) {
    add_designer_message(
      'Operation ' +
        op.id +
        ' does not have a (deployed) operation type. Not showing.'
    );
    add_designer_message(
      'This plan uses obsolete operation definitions. ' +
        'Consider making a copy, which will make a fresh plan with no such problems.'
    );
    return null;
  } else {
    op.operation_type = ots[0];
  }

  var updated_job_associations = [];

  aq.each(op.job_associations, ja => {
    let uja = AQ.JobAssociation.record(ja);
    updated_job_associations.push(uja);
  });

  op.job_associations = updated_job_associations;

  var input_index = 0,
    output_index = 0;
  var updated_field_values = [];

  aq.each(op.field_values, fv => {
    var ufv = AQ.FieldValue.record(fv);
    AQ.id_map[fv.id] = ufv.rid;

    aq.each(op.operation_type.field_types, ft => {
      if (ft.role == ufv.role && ft.name == ufv.name) {
        ufv.field_type = ft;
        ufv.routing = ft.routing;
        ufv.num_wires = 0;
      }
    });

    if (!ufv.field_type) {
      add_designer_message(
        'Field type for ' +
          ufv.role +
          " '" +
          ufv.name +
          "' of '" +
          op.operation_type.name +
          "'  is undefined. This i/o has been dropped. "
      );
      add_designer_message(
        'This plan uses obsolete operation definitions. ' +
          'Consider making a copy, which will make a fresh plan with no such problems.'
      );
    } else {
      if (ufv.role == 'input') {
        // these indices are for methods that need to know
        ufv.index = input_index++; // which input the fv is (e.g. first, second, etc.)
      }

      if (ufv.role == 'output') {
        ufv.index = output_index++;
      }

      updated_field_values.push(ufv);
    }
  });

  op.field_values = updated_field_values;

  aq.each(op.field_values, fv => {
    if (fv.child_sample_id) {
      op.assign_sample(fv, AQ.to_sample_identifier(fv.child_sample_id));
    } else if (fv.field_type.routing && !op.routing[fv.field_type.routing]) {
      op.routing[fv.field_type.routing] = '';
    }

    if (fv.allowable_field_type_id) {
      fv.aft = find_aft(fv.allowable_field_type_id, op.operation_type);
      fv.aft_id = fv.allowable_field_type_id;
      op.form[fv.role][fv.name] = {
        aft_id: fv.allowable_field_type_id,
        aft: fv.aft
      };
    }
  });

  op.width = 160;
  op.height = 30;

  return op;
};

AQ.Plan.record_methods.marshall = function() {
  let plan = this,
    marshalled_operations = [];

  aq.each(plan.operations, op => {
    var op = AQ.Operation.record(op).marshall();
    if (op) {
      marshalled_operations.push(op);
      op.plan = plan;
    }
  });

  plan.operations = marshalled_operations;

  plan.wires = aq.collect(plan.wires, wire => AQ.Wire.record(wire));

  var skip_wires = [];

  aq.each(plan.wires, w => {
    w.snap = 16;
    aq.each(plan.operations, o => {
      aq.each(o.field_values, fv => {
        if (w.to_id == fv.id) {
          w.to = fv;
          w.to_op = o;
          w.to.num_wires++;
        }
        if (w.from_id == fv.id) {
          w.from = fv;
          w.from_op = o;
          w.from.num_wires++;
        }
        // fv.recompute_getter("num_wires");
      });
      o.recompute_getter('types_and_values');
      o.recompute_getter('num_inputs');
      o.recompute_getter('num_outputs');
    });
    if (!w.to || !w.from) {
      skip_wires.push(w);
    }
  });

  plan.wires = aq.where(plan.wires, w => !skip_wires.includes(w));

  plan.layout = plan.marshall_layout();
  plan.open = true;

  return plan;
};

AQ.Plan.record_methods.marshall_layout = function() {
  let plan = this;

  Module.next_module_id = 0;
  ModuleIO.next_io_id = 0;

  if (plan.layout) {
    plan.base_module = new Module().from_object(JSON.parse(plan.layout), plan);
    delete plan.current_module;
  } else {
    delete plan.current_module;
    plan.create_base_module();
  }

  plan.current_module = plan.base_module;

  plan.base_module.associate_fvs();
};

//
// app/assets/javascripts/models/module.js
//

class Module {
  constructor() {}

  for_parent(parent) {
    this.name = 'Untitled Module ' + this.next_id;
    this.id = this.next_id;
    this.x = 160;
    this.y = 160;
    this.width = 160;
    this.height = 60;
    this.children = [];
    this.model = { model: 'Module' }; // for compatability with AQ.Record
    this.input = [];
    this.output = [];
    this.wires = [];
    this.text_boxes = [];
    this.parent_id = parent ? parent.id : -1;
    this.documentation = 'No documentation yet for this module.';

    this.inc_next_id();

    return this;
  }

  from_object(object, plan) {
    for (var p in object) {
      this[p] = object[p];
    }

    this.width = 160;
    this.height = 60;

    if (typeof this.x == 'string') {
      console.log('WARNING: module x coordinate is a string. Converting');
      this.x = parseFloat(this.x);
      console.log('got ', this.x);
    }

    if (typeof this.y == 'string') {
      console.log('WARNING: module x coordinate is a string. Converting');
      this.y = parseFloat(this.y);
    }

    if (!this.children) this.children = [];
    if (!this.input) this.input = [];
    if (!this.output) this.output = [];
    if (!this.wires) this.wires = [];

    this.input = aq.collect(this.input, i => new ModuleIO().from_object(i));
    this.output = aq.collect(this.output, o => new ModuleIO().from_object(o));
    this.children = aq.collect(this.children, c =>
      new Module().from_object(c, plan)
    );
    this.wires = aq.collect(this.wires, w =>
      new ModuleWire().from_object(w, this, plan)
    );
    this.text_boxes = aq.collect(this.text_boxes, box =>
      new TextBox().from_object(box)
    );

    if (!this.documentation) {
      this.documentation = 'No documentation yet for this module.';
    }

    this.constructor.next_module_id++;

    return this;
  }

  get next_id() {
    if (!this.constructor.next_module_id) {
      // console.log("Resetting Module.next_id to zero")
      this.constructor.next_module_id = 0;
    }
    return this.constructor.next_module_id;
  }

  get record_type() {
    return 'Module';
  }

  inc_next_id() {
    this.constructor.next_module_id++;
  }

  add_input(fv) {
    // why does this have an fv argument that it ignores?
    var m = new ModuleIO().build();
    m.x = this.next_input_pos;
    m.y = 320;
    this.input.push(m);
    return m;
  }

  add_output(fv) {
    // why does this have an fv argument that it ignores?
    var m = new ModuleIO().build();
    m.x = this.next_output_pos;
    m.y = 32;
    this.output.push(m);
    return m;
  }

  get next_input_pos() {
    if (!this.constructor.input_pos) {
      this.constructor.input_pos = 48;
    } else {
      this.constructor.input_pos += 48;
    }
    return this.constructor.input_pos;
  }

  get next_output_pos() {
    if (!this.constructor.output_pos) {
      this.constructor.output_pos = 48;
    } else {
      this.constructor.output_pos += 48;
    }
    return this.constructor.output_pos;
  }

  connect(io1, object1, io2, object2) {
    var wire = new ModuleWire().build({
      from: io1,
      to: io2,
      from_op: object1.record_type == 'Operation' ? object1 : null,
      to_op: object2.record_type == 'Operation' ? object2 : null,
      from_module: object1.record_type == 'Module' ? object1 : null,
      to_module: object2.record_type == 'Module' ? object2 : null
    });
    this.wires.push(wire);
    // console.log([this.name, this.wires])
    return wire;
  }

  num_inputs() {
    return this.inputs.length;
  }

  remove_child_operations(plan) {
    var module = this,
      ops = aq.where(plan.operations, op => op.parent_id == module.id);

    plan.wires = aq.where(plan.wires, w => {
      var remove = ops.includes(w.to_op) || ops.includes(w.from_op);
      if (remove) {
        w.disconnect();
      }
      return !remove;
    });

    plan.operations = aq.where(
      plan.operations,
      op => op.parent_id != module.id
    );

    aq.each(module.children, c => c.remove_child_operations(plan));
  }

  remove(child, plan) {
    var module = this,
      old_wires = plan.get_implied_wires();

    child.remove_child_operations(plan);
    aq.remove(this.children, child);
    this.wires = aq.where(
      this.wires,
      w => w.from_module != child && w.to_module != child
    );

    plan.delete_obsolete_wires(old_wires);
    module.associate_fvs();
    plan.recount_fv_wires();
  }

  remove_io(io, plan) {
    var module = this,
      old_wires = plan.get_implied_wires();

    plan.base_module.remove_wires_connected_to(io, plan);

    aq.remove(module.input, io);
    aq.remove(module.output, io);

    plan.delete_obsolete_wires(old_wires);
    module.associate_fvs();
    plan.recount_fv_wires();
  }

  remove_wires_connected_to(io, plan) {
    var module = this;
    var old_wires = plan.get_implied_wires();

    module.wires = aq.where(module.wires, w => w.from != io && w.to != io);
    aq.each(module.children, c => c.remove_wires_connected_to(io, plan));

    plan.delete_obsolete_wires(old_wires);
    module.associate_fvs();
    plan.recount_fv_wires();
  }

  remove_operation(op) {
    this.wires = aq.where(this.wires, w => w.from_op != op && w.to_op != op);
  }

  index_of_input(io) {
    return this.input.indexOf(io);
  }

  index_of_output(io) {
    return this.output.indexOf(io);
  }

  find_by_id(mid) {
    var result;
    if (this.id == mid) {
      result = this;
    } else {
      result = aq.find(this.children, c => c.id == mid);
    }
    return result;
  }

  find_io_by_id(id) {
    var result = aq.find(this.input, i => i.id == id);
    if (result) return result;

    result = aq.find(this.output, o => o.id == id);
    if (result) return result;

    for (var c in this.children) {
      result = this.children[c].find_io_by_id(id);
      if (result) return result;
    }

    return null;
  }

  input_pin_x(io) {
    return (
      this.x +
      this.width / 2 +
      (this.index_of_input(io) - this.input.length / 2.0 + 0.5) * AQ.snap
    );
  }

  input_pin_y(io) {
    return this.y + this.height;
  }

  output_pin_x(io) {
    return (
      this.x +
      this.width / 2 +
      (this.index_of_output(io) - this.output.length / 2.0 + 0.5) * AQ.snap
    );
  }

  output_pin_y(io) {
    return this.y;
  }

  role(io) {
    if (this.input.includes(io)) {
      return 'input';
    } else if (this.output.includes(io)) {
      return 'output';
    } else {
      return null;
    }
  }

  get all_wires() {
    var wires = this.wires;

    aq.each(this.children, c => {
      wires = wires.concat(c.all_wires);
    });

    return wires;
  }

  num_wires_into(io) {
    var n = aq.where(this.wires, w => w.to.rid == io.rid).length;

    aq.each(this.children, c => {
      n += c.num_wires_into(io);
    });

    return n;
  }

  remove_wire(wire) {
    aq.remove(this.wires, wire);
  }

  origin(io) {
    var result = null,
      module = this,
      wire = aq.find(this.all_wires, w => io.id == w.to.id);

    if (wire) {
      // console.log("A: origin: io " + io.id + " is the end of wire " + wire.from.rid + " ---> " + wire.to.rid)
      if (wire.from.record_type == 'FieldValue') {
        result = { io: wire.from, op: wire.from_op };
      } else {
        result = module.origin(wire.from);
      }
    } else {
      result = { io: {}, op: {} };
    }

    return result;
  }

  destinations_aux(io, op = null) {
    var results = [],
      module = this,
      wires = aq.where(this.all_wires, w => io.rid == w.from.rid);

    if (wires.length > 0) {
      // console.log(["destinations", io, module, wires])

      for (w in wires) {
        if (!wires[w].marked) {
          // not sure why this is needed, but it prevents an inf loop
          // when modularizig a selection in an unsaved plan.
          wires[w].marked = true;
          results = results.concat(
            module.destinations_aux(wires[w].to, wires[w].to_op)
          );
        }
      }
    } else {
      results = [{ io: io, op: op }];
    }

    return results;
  }

  destinations(io, op) {
    aq.each(this.all_wires, w => delete w.marked);
    return this.destinations_aux(io, op);
  }

  get io() {
    return this.input.concat(this.output);
  }

  get all_io() {
    var io_list = this.io;
    for (var c in this.children) {
      io_list = io_list.concat(this.children[c].all_io);
    }
    return io_list;
  }

  get all_input() {
    var io_list = this.input;
    for (var c in this.children) {
      io_list = io_list.concat(this.children[c].all_input);
    }
    return io_list;
  }

  get all_output() {
    var io_list = this.output;
    for (var c in this.children) {
      io_list = io_list.concat(this.children[c].all_output);
    }
    return io_list;
  }

  clear_fvs() {
    aq.each(this.all_io, io => {
      io.origin_fv = null;
      io.destinations = [];
    });
  }

  associate_fvs() {
    var module = this,
      dests,
      origin;

    aq.each(module.all_io, io => {
      dests = module.destinations(io);

      io.destinations = aq.where(dests, d => d.io.record_type == 'FieldValue');

      // console.log("associate_fvs: " + io.rid + ". origin: " + (io.origin ? io.origin.io.rid : null) +
      //           ", destinations: [" +  aq.collect(io.destinations, d => d.io.rid).join(", ") + "]");
    });

    aq.each(module.all_io, io => {
      origin = module.origin(io);

      if (origin.io.record_type == 'FieldValue') {
        io.origin = origin;
      } else {
        io.origin = null;
      }

      // console.log("associate_fvs: " + io.rid + ". origin: " + (io.origin ? io.origin.io.rid : null) +
      //           ", destinations: [" +  aq.collect(io.destinations, d => d.io.rid).join(", ") + "]");
    });
  }

  renumber() {
    var module = this,
      old_id = module.id;

    module.id = module.next_id;
    module.inc_next_id();

    if (!this.constructor.id_map) this.constructor.id_map = [];
    this.constructor.id_map[old_id] = module.id;

    aq.each(this.input.concat(this.output), io => {
      io.id = io.next_id;
      io.inc_next_id();
    });

    aq.each(module.children, child => {
      child.parent_id = module.id;
      child.renumber();
    });
  }

  merge(new_module) {
    var module = this;

    module.wires = module.wires.concat(new_module.wires);

    aq.each(new_module.children, new_child => {
      new_child.parent_id = module.id;
      module.children.push(new_child);
    });
  }

  compute_cost(plan) {
    var module = this;

    module.cost = 0;

    aq.each(module.children, child => {
      module.cost += child.compute_cost(plan);
    });

    aq.each(plan.operations, op => {
      if (op.parent_id == module.id) {
        module.cost += op.cost;
      }
    });

    return module.cost;
  }

  get rendered_docs() {
    var module = this;
    var md = window.markdownit();
    return AQ.sce.trustAsHtml(md.render(module.documentation));
  }

  create_text_box() {
    let module = this,
      box = new TextBox();

    if (!module.text_boxes) {
      module.text_boxes = [];
    }

    module.text_boxes.push(box);

    return box;
  }

  deletable(plan) {
    let module = this,
      answer = true;

    console.log('Checking whether ' + module.name + ' can be deleted.', plan);

    aq.each(
      plan.operations,
      op =>
        (answer =
          answer && (op.parent_id != module.id || op.status == 'planning'))
    );
    aq.each(
      module.children,
      child => (answer = answer && child.deletable(plan))
    );

    console.log('answer = ' + answer, plan.operations);

    return answer;
  }
}

//
// app/assets/javascripts/models/module_io.js
//

class ModuleIO {
  constructor() {}

  build() {
    this.id = this.next_id;
    this.inc_next_id();
    this.x = 160;
    this.y = this.next_pos;
    this.width = 32;
    this.height = 32;
    this.model = { model: 'ModuleIO' }; // for compatability with AQ.Record
    return this;
  }

  from_object(object) {
    for (var p in object) {
      this[p] = object[p];
    }
    // this.id = this.next_id;
    this.inc_next_id();
    this.width = 32;
    this.height = 32;
    return this;
  }

  get record_type() {
    return 'ModuleIO';
  }

  get rid() {
    return this.id; // for compatability with AQ.Record
  }

  get next_id() {
    if (!this.constructor.next_io_id) {
      this.constructor.next_io_id = 0;
    }
    return this.constructor.next_io_id;
  }

  inc_next_id() {
    if (!this.constructor.next_io_id) {
      this.constructor.next_io_id = 0;
    }
    this.constructor.next_io_id++;
  }

  input_pin_x() {
    return this.x + this.width / 2;
  }

  input_pin_y() {
    return this.y + this.height;
  }

  output_pin_x() {
    return this.x + this.width / 2;
  }

  output_pin_y() {
    return this.y;
  }

  get is_param() {
    var io = this;
    if (io.destinations && io.destinations.length > 0) {
      return io.destinations[0].io.field_type.ftype != 'sample';
    } else {
      return false;
    }
  }
}
//
// app/assets/javascripts/models/module_wire.js
//

class ModuleWire {
  constructor() {}

  build(object) {
    for (var p in object) {
      this[p] = object[p];
    }
    return this;
  }

  from_object(w, module, plan) {
    for (var p in w) {
      this[p] = w[p];
    }

    if (this.from_module)
      this.from_module = module.find_by_id(this.from_module.id);
    if (this.to_module) this.to_module = module.find_by_id(this.to_module.id);

    if (this.from_op) this.from_op = plan.find_by_id(this.from_op.id);
    if (this.to_op) this.to_op = plan.find_by_id(this.to_op.id);

    if (this.from && this.from.record_type == 'FieldValue')
      this.from = plan.find_by_id(this.from.id);
    if (this.to && this.to.record_type == 'FieldValue')
      this.to = plan.find_by_id(this.to.id);

    if (this.from && this.from.record_type == 'ModuleIO') {
      this.from = this.from_module.find_io_by_id(this.from.id);
    }

    if (this.to && this.to.record_type == 'ModuleIO') {
      this.to = this.to_module.find_io_by_id(this.to.id);
    }

    return this;
  }

  get record_type() {
    return 'ModuleWire';
  }

  consistent() {
    return true;
  }

  serialize() {
    var wire = { type: this.type };

    if (this.from_module) wire.from_module = { id: this.from_module.id };
    if (this.to_module) wire.to_module = { id: this.to_module.id };

    if (this.from_op) wire.from_op = { rid: this.from_op.rid };
    if (this.to_op) wire.to_op = { rid: this.to_op.rid };

    if (this.from.record_type == 'FieldValue')
      wire.from = { record_type: 'FieldValue', rid: this.from.rid };
    if (this.to.record_type == 'FieldValue')
      wire.to = { record_type: 'FieldValue', rid: this.to.rid };

    if (this.from.record_type == 'ModuleIO')
      wire.from = { record_type: 'ModuleIO', id: this.from.id };
    if (this.to.record_type == 'ModuleIO')
      wire.to = { record_type: 'ModuleIO', id: this.to.id };

    return wire;
  }

  get x0() {
    if (this.from_module) {
      var to_object = this.to_op ? this.to_op : this.to_module;
      if (this.from_module.parent_id == to_object.id) {
        return this.from_module.output_pin_x(this.from);
      } else if (this.from_module.parent_id != to_object.parent_id) {
        return this.from.output_pin_x();
      } else {
        return this.from_module.output_pin_x(this.from);
      }
    } else {
      return this.from_op.output_pin_x(this.from);
    }
  }

  get y0() {
    var to_object = this.to_op ? this.to_op : this.to_module;
    if (this.from_module) {
      if (this.from_module.parent_id == to_object.id) {
        return this.from_module.output_pin_y();
      } else if (this.from_module.parent_id != to_object.parent_id) {
        return this.from.output_pin_y();
      } else {
        return this.from_module.output_pin_y();
      }
    } else {
      return this.from_op.output_pin_y();
    }
  }

  get x1() {
    var from_object = this.from_op ? this.from_op : this.from_module;
    if (this.to_module) {
      if (this.to_module.parent_id == from_object.id) {
        return this.to_module.input_pin_x(this.to);
      } else if (from_object.parent_id != this.to_module.parent_id) {
        return this.to.input_pin_x();
      } else {
        return this.to_module.input_pin_x(this.to);
      }
    } else {
      return this.to_op.input_pin_x(this.to);
    }
  }

  get y1() {
    var from_object = this.from_op ? this.from_op : this.from_module;
    if (this.to_module) {
      if (this.to_module.parent_id == from_object.id) {
        return this.to_module.input_pin_y(this.to);
      } else if (from_object.parent_id != this.to_module.parent_id) {
        return this.to.input_pin_y();
      } else {
        return this.to_module.input_pin_y(this.to);
      }
    } else {
      return this.to_op.input_pin_y();
    }
  }

  get ymid() {
    if (!this.ymid_frac) {
      this.ymid_frac = 0.5;
    }
    return this.ymid_frac * (this.y0 + this.y1);
  }

  get xmid() {
    if (!this.xmid_frac) {
      this.xmid_frac = 0.5;
    }
    return this.xmid_frac * (this.x0 + this.x1);
  }

  get yint0() {
    return this.y0 - AQ.snap;
  }

  get yint1() {
    return this.y1 + AQ.snap;
  }

  get path() {
    if (this.y0 >= this.y1 + 2 * AQ.snap) {
      return (
        '' +
        this.x0 +
        ',' +
        this.y0 +
        ' ' +
        this.x0 +
        ',' +
        this.ymid +
        ' ' +
        this.x1 +
        ',' +
        this.ymid +
        ' ' +
        this.x1 +
        ',' +
        this.y1
      );
    } else {
      return (
        '' +
        this.x0 +
        ',' +
        this.y0 +
        ' ' +
        this.x0 +
        ' ' +
        this.yint0 +
        ' ' +
        this.xmid +
        ',' +
        this.yint0 +
        ' ' +
        this.xmid +
        ',' +
        this.yint1 +
        ' ' +
        this.x1 +
        ',' +
        this.yint1 +
        ' ' +
        this.x1 +
        ',' +
        this.y1
      );
    }
  }

  get arrowhead() {
    return (
      'M ' +
      this.x1 +
      ' ' +
      (this.y1 + 5) +
      ' L ' +
      (this.x1 + 0.25 * AQ.snap) +
      ' ' +
      (this.y1 + 0.75 * AQ.snap) +
      ' L ' +
      (this.x1 - 0.25 * AQ.snap) +
      ' ' +
      (this.y1 + 0.75 * AQ.snap) +
      ' Z'
    );
  }

  get to_s() {
    var wire = this,
      str = 'Wire. ';

    if (wire.from_module) {
      str += 'Module ' + wire.from_module.id + ' (io ' + wire.from.rid + ')';
    } else {
      str += 'Operation ' + wire.from_op.rid + ' (fv ' + wire.from.rid + ')';
    }

    str += ' --> ';

    if (wire.to_module) {
      str += 'Module ' + wire.to_module.id + ' (io ' + wire.to.rid + ')';
    } else {
      str += 'Operation ' + wire.to_op.rid + ' (fv ' + wire.to.rid + ')';
    }

    return str;
  }

  get from_obj() {
    return this.from_module ? this.from_module : this.from_op;
  }

  get to_obj() {
    return this.to_module ? this.to_module : this.to_op;
  }
}

//
// app/assets/javascripts/models/operation.js
//

AQ.Operation.getter(AQ.User, 'user');

AQ.Operation.next_x = 100;
AQ.Operation.next_y = 100;

AQ.Operation.new_operation = function(
  operation_type,
  parent_module_id = 0,
  x = 100,
  y = 100
) {
  var op = AQ.Operation.record({
    x: x,
    y: y,
    width: 160,
    height: 30,
    routing: {},
    form: { input: {}, output: {} },
    parent_id: parent_module_id,
    status: 'planning'
  });
  op.set_type(operation_type);

  return op;
};

AQ.Operation.record_methods.upgrade = function(raw_data) {
  let operation = this;
  operation.show_uploads = false;

  if (raw_data && raw_data.operation_type) {
    operation.operation_type = AQ.OperationType.record(raw_data.operation_type);
  }

  if (!operation.x) {
    operation.x = AQ.Operation.next_x;
    AQ.Operation.next_x += AQ.snap;
  }

  if (!operation.y) {
    operation.y = AQ.Operation.next_y;
    AQ.Operation.next_y += AQ.snap;
  }

  return operation;
};

AQ.Operation.record_getters.plans = function() {
  let op = this;
  delete op.plans;
  AQ.PlanAssociation.where({ operation_id: op.id }, { include: 'plan' }).then(
    pas => {
      op.plans = aq.collect(pas, pa => AQ.Plan.record(pa.plan));
    }
  );
  return [];
};

AQ.Operation.record_getters.alt_field_values = function() {
  // Note this method should replace field_values, but can't because of some
  // backward compatability issues in the planner.
  let op = this;
  delete op.alt_field_values;
  AQ.FieldValue.where({ parent_id: op.id, parent_class: 'Operation' }).then(
    fvs => {
      op.alt_field_values = aq.collect(fvs, fv => AQ.FieldValue.record(fv));
      AQ.update();
    }
  );
  return [];
};

AQ.Operation.record_methods.set_type = function(operation_type) {
  var op = this;

  op.operation_type_id = operation_type.id;
  op.operation_type = operation_type;
  op.field_values = [];

  var input_index = 0,
    output_index = 0;

  aq.each(operation_type.field_types, ft => {
    var fv = AQ.FieldValue.record({
      name: ft.name,
      role: ft.role,
      routing: ft.routing,
      field_type: ft
    });

    if (fv.role == 'input') {
      // these indices are for methods that need to know
      fv.index = input_index++; // which input the fv is (e.g. first, second, etc.)
    }

    if (fv.role == 'output') {
      fv.index = output_index++;
    }

    op.field_values.push(fv);

    if (ft.allowable_field_types.length > 0) {
      op.set_aft(ft, ft.allowable_field_types[0]);
    }

    fv.items = [];
  });

  return this;
};

AQ.Operation.record_getters.num_inputs = function() {
  var op = this;
  delete op.num_inputs;
  op.num_inputs = aq.sum(op.field_values, fv => (fv.role == 'input' ? 1 : 0));
  return op.num_inputs;
};

AQ.Operation.record_getters.num_outputs = function() {
  var op = this;
  delete op.num_outputs;
  op.num_outputs = aq.sum(op.field_values, fv => (fv.role == 'output' ? 1 : 0));
  return op.num_outputs;
};

AQ.Operation.record_methods.set_type_with_field_values = function(
  operation_type,
  fvs
) {
  var op = this;
  op.operation_type_id = operation_type.id;
  op.operation_type = operation_type;
  op.field_values = [];
  op.routing = {};

  aq.each(operation_type.field_types, ft => {
    aq.each(fvs, old_fv => {
      if (old_fv.role == ft.role && old_fv.name == ft.name) {
        var fv = AQ.FieldValue.record({
          name: ft.name,
          role: ft.role,
          items: [],
          routing: ft.routing,
          field_type: ft,
          id: old_fv.id
          // child_sample: old_fv.child_sample
        });

        if (ft.allowable_field_types.length > 0) {
          fv.aft = ft.allowable_field_types[0];
          fv.aft_id = ft.allowable_field_types[0].id;
        }

        op.field_values.push(fv);

        if (ft.allowable_field_types.length > 0) {
          op.set_aft(ft, ft.allowable_field_types[0]);
        }

        if (ft.array) {
          fv.sample_identifier = fv.sid();
        } else {
          op.routing[ft.routing] = fv.sid();
        }

        if (fv.sid() != '') {
          fv.find_items(fv.sid());
        }
      }
    });
  });

  return this;
};

AQ.Operation.record_methods.set_aft = function(ft, aft) {
  let op = this;

  op.form[ft.role][ft.name] = { aft_id: aft.id, aft: aft };

  aq.each(op.field_values, function(fv) {
    if (fv.name == ft.name && fv.role == ft.role) {
      op.routing[ft.routing] = '';
      fv.aft = aft;
      fv.aft_id = aft.id;
      fv.allowable_field_type_id = aft.id;
      fv.field_type = ft;
      fv.recompute_getter('predecessors');
      fv.recompute_getter('successors');
      delete fv.items;
      delete fv.sid;
      delete fv.sample_identifier;
      delete fv.child_sample_id;
      delete fv.child_item_id;

      if (op.plan) {
        // try to assign a sample by looking at equivalent field values
        let assigned_fvs = aq.where(
          AQ.Plan.equivalence_class_of(op.plan.classes(), fv),
          other_fv => other_fv.child_sample_id
        );

        if (assigned_fvs.length > 0) {
          op.assign_sample(fv, assigned_fvs[0].sid);
        }
      }
    }
  });
};

AQ.Operation.record_methods.clear = function() {
  delete this.operation_type_id;
  delete this.operation_type;
  delete this.allowable_field_types;
  return this;
};

AQ.Operation.record_methods.assign_sample = function(fv, sid) {
  var op = this;

  fv.child_sample_id = AQ.id_from(sid);
  fv.sid = sid;

  if (fv.field_type && !fv.field_type.array) {
    op.routing[fv.routing] = sid;
  }

  if (fv.field_type && fv.field_type.array) {
    fv.sample_identifier = sid;
  }

  op.recompute_getter('types_and_values');

  return op;
};

AQ.Operation.record_methods.array_remove = function(fv) {
  var j = 0;

  while (this.field_values[j] != fv) {
    j++;
  }
  fv.deleted = true;

  this.field_values.splice(j, 1);
  this.recompute_getter('types_and_values');
  this.recompute_getter('num_inputs');
  this.recompute_getter('num_outputs');

  return this;
};

AQ.Operation.record_methods.array_add = function(field_type) {
  var fv = AQ.FieldValue.record({
    name: field_type.name,
    role: field_type.role,
    routing: field_type.routing,
    items: [],
    field_type: field_type
  });

  if (
    this.form &&
    this.form[field_type.role] &&
    this.form[field_type.role][field_type.name]
  ) {
    fv.aft = this.form[field_type.role][field_type.name].aft;
    fv.aft_id = this.form[field_type.role][field_type.name].aft_id;
  }

  this.field_values.push(fv);

  this.recompute_getter('types_and_values');
  this.recompute_getter('num_inputs');
  this.recompute_getter('num_outputs');

  return this;
};

AQ.Operation.record_methods.each_field = function(callback) {
  var op = this;

  aq.each(op.operation_type.field_types, ft => {
    aq.each(op.field_values, fv => {
      if (ft.name == fv.name && ft.role == fv.role) {
        callback(ft, fv);
      }
    });
  });

  return this;
};

AQ.Operation.record_methods.each_input = function(callback) {
  this.each_field((ft, fv) => {
    if (ft.role == 'input') {
      callback(ft, fv);
    }
  });
  return this;
};

AQ.Operation.record_methods.each_output = function(callback) {
  this.each_field((ft, fv) => {
    if (ft.role == 'output') {
      callback(ft, fv);
    }
  });
  return this;
};

AQ.Operation.record_methods.update_cost = function() {
  var op = this;

  AQ.post('/launcher/cost', op)
    .then(result => {
      op.cost = result.data.cost;
    })
    .catch(problem => {});

  return this;
};

AQ.Operation.record_methods.io = function(name, role, index = 0) {
  var fvs = aq.where(
    this.field_values,
    fv => fv.name == name && fv.role == role
  );

  if (fvs.length > index) {
    return fvs[index];
  } else {
    throw 'Attempted to access nonexistent ' +
      role +
      " named '" +
      name +
      "'" +
      ' indexed by ' +
      index;
  }
};

AQ.Operation.record_methods.output = function(name, index = 0) {
  return this.io(name, 'output', index);
};
AQ.Operation.record_methods.input = function(name, index = 0) {
  return this.io(name, 'input', index);
};

AQ.Operation.record_methods.reload = function() {
  var operation = this;

  return new Promise(function(resolve, reject) {
    AQ.Operation.find(operation.id).then(op => {
      operation.status = op.status;
      operation.job_id = op.job_id;
      operation.recompute_getter('data_associations');
      operation.recompute_getter('job');
      aq.each(operation.field_values, fv => {
        fv.reload();
      });
    });
  });
};

AQ.Operation.record_getters.inputs = function() {
  var op = this;
  delete op.inputs;

  op.inputs = aq.where(op.field_values, fv => fv.role == 'input');

  return op.inputs;
};

AQ.Operation.record_getters.outputs = function() {
  var op = this;
  delete op.outputs;

  op.outputs = aq.where(op.field_values, fv => fv.role == 'output');

  return op.outputs;
};

AQ.Operation.record_getters.types_and_values = function() {
  var op = this,
    tvs = [];

  delete op.types_and_values;

  var input_index = 0,
    output_index = 0;

  aq.each(['input', 'output'], role => {
    aq.each(op.operation_type.field_types, ft => {
      if (ft.role == role) {
        aq.each(op.field_values, fv => {
          if (fv.role == ft.role && ft.name == fv.name) {
            var tv = { type: ft, value: fv, role: role };
            tvs.push(tv);
            if (role == 'input') {
              fv.index = input_index++;
            } else {
              fv.index = output_index++;
            }
          }
        });
        if (ft.array) {
          tvs.push({
            type: ft,
            value: {},
            array_add_button: true,
            role: ft.role
          });
        }
      }
    });
  });

  op.types_and_values = tvs;

  return tvs;
};

AQ.Operation.record_getters.jobs = function() {
  let op = this;
  delete op.jobs;

  if (op.id == undefined || op.id == null) {
    console.log('WARNING: Operation with undefined id.', op);
    op.jobs = [];
    return [];
  } else if (op.job_associations) {
    op.jobs = aq.collect(op.job_associations, ja => AQ.Job.record(ja.job));
    return op.jobs;
  } else {
    AQ.JobAssociation.where({ operation_id: op.id }, { include: 'job' }).then(
      jas => {
        op.jobs = aq.collect(jas, ja => AQ.Job.record(ja.job));
        AQ.update();
      }
    );

    return op.jobs;
  }
};

AQ.Operation.record_getters.last_job = function() {
  var op = this;
  delete op.last_job;

  if (op.jobs && op.jobs.length > 0) {
    op.last_job = op.jobs[op.jobs.length - 1];
  } else {
    op.last_job = null;
  }

  return op.last_job;
};

AQ.Operation.record_methods.copy = function() {
  var op = this,
    new_op = AQ.Operation.record({});

  new_op.form = { input: {}, output: {} };
  new_op.set_type_with_field_values(
    aq.find(AQ.operation_types, ot => ot.id == op.operation_type_id),
    op.field_values
  );

  return new_op;
};

AQ.Operation.record_methods.field_value_like = function(ofv) {
  var op = this;
  return aq.find(op.field_values, fv => {
    return fv.name == ofv.name && fv.role == ofv.role;
  });
};

AQ.Operation.record_methods.field_value_with_id = function(id) {
  var op = this;
  return aq.find(op.field_values, fv => {
    return fv.id == id;
  });
};

AQ.Operation.record_methods.set_status = function(status) {
  var op = this;

  return new Promise(function(resolve, reject) {
    AQ.get('/operations/' + op.id + '/status/' + status).then(response => {
      if (response.data.status == status) {
        op.status = status;
        resolve(op);
      }
    });
  });
};

/*
 * If the operation is a leaf or if its inputs are ready and its precondition is true,
 * then set the operation to 'pending' else set it to 'waiting'.
 */
AQ.Operation.record_methods.retry = function() {
  let op = this;

  return new Promise(function(resolve, reject) {
    AQ.get(`/operations/${op.id}/retry`)
      .then(response => {
        console.log(response);
        if (response.data.status) {
          op.status = response.data.status;
          resolve(op);
        }
      })
      .catch(e => console.log('Could not retry action', e));
  });
};

AQ.Operation.record_methods.input_pin_x = function(fv) {
  return (
    this.x + this.width / 2 + (fv.index - this.num_inputs / 2.0 + 0.5) * AQ.snap
  );
};

AQ.Operation.record_methods.input_pin_y = function(fv) {
  return this.y + this.height;
};

AQ.Operation.record_methods.output_pin_x = function(fv) {
  return (
    this.x +
    this.width / 2 +
    (fv.index - this.num_outputs / 2.0 + 0.5) * AQ.snap
  );
};

AQ.Operation.record_methods.output_pin_y = function(fv) {
  return this.y;
};

AQ.Operation.record_methods.role = function(fv) {
  return fv.role;
};

AQ.Operation.step_all = function() {
  return AQ.get('/operations/step');
};

AQ.Operation.manager_list = function(criteria, options) {
  return new Promise(function(resolve, reject) {
    AQ.post('/operations/manager_list', {
      criteria: criteria,
      options: options
    }).then(response => {
      let ops = aq.collect(response.data, op => AQ.Operation.record(op));
      aq.each(ops, op => {
        op.job = AQ.Job.record(op.job);
        op.user = AQ.User.record(op.user);
        op.plans = aq.collect(op.plans, plan => AQ.Plan.record(plan));
        op.field_values = aq.collect(op.field_values, raw_fv => {
          fv = AQ.FieldValue.record(raw_fv);
          if (fv.item) {
            fv.item = AQ.Item.record(fv.item);
            fv.item.object_type = AQ.ObjectType.record(fv.item.object_type);
          }
          if (fv.sample) {
            fv.sample = AQ.Sample.record(fv.sample);
          }
          return fv;
        });
        op.data_associations = aq.collect(op.data_associations, da =>
          AQ.DataAssociation.record(da)
        );
      });
      resolve(ops);
    });
  });
};

AQ.Operation.record_methods.process_upload_complete = function() {
  let operation = this;
  try {
    update_job_uploads();
  } catch (e) {
    console.log('process_upload_complete failed', e);
  }
};

//
// app/assets/javascripts/models/operation_type.js
//

// BASE METHODS ============================================================

AQ.OperationType.compute_categories = function(ots) {
  ots.categories = aq.uniq(
    aq.collect(ots, function(ot) {
      return ot.category;
    })
  );
};

AQ.OperationType.all = function(rest) {
  return this.super('all', rest).then(ots => {
    this.compute_categories(ots);
    return ots;
  });
};

AQ.OperationType.all_with_content = function(deployed) {
  if (deployed) {
    return this.array_query(
      'where',
      { deployed: true },
      { methods: ['field_types', 'cost_model', 'documentation', 'timing'] }
    ).then(ots => {
      aq.each(ots, function(ot) {
        ot.upgrade_field_types();
        if (ot.timing) {
          ot.timing = AQ.Timing.record(ot.timing);
        }
      });
      this.compute_categories(ots);
      return ots;
    });
  } else {
    return this.array_query('all', [], {
      methods: ['field_types', 'cost_model', 'documentation', 'timing']
    }).then(ots => {
      aq.each(ots, function(ot) {
        ot.upgrade_field_types();
        if (ot.timing) {
          ot.timing = AQ.Timing.record(ot.timing);
        }
      });
      this.compute_categories(ots);
      return ots;
    });
  }
};

AQ.OperationType.deployed_with_timing = function() {
  return new Promise(function(resolve, reject) {
    AQ.get('/operation_types/deployed_with_timing').then(raw_ots => {
      let ots = aq.collect(raw_ots.data, raw_ot => {
        let ot = AQ.OperationType.record(raw_ot);
        ot.timing = AQ.Timing.record(ot.timing);
        return ot;
      });

      console.log(raw_ots);

      resolve(ots);
    });
  });
};

AQ.OperationType.all_fast = function(deployed_only = false) {
  return new Promise(function(resolve, reject) {
    AQ.get('/plans/operation_types/' + deployed_only)
      .then(response => {
        ots = aq.collect(response.data, rot => {
          var ot = AQ.OperationType.record(rot);
          ot.upgrade_field_types();
          return ot;
        });

        resolve(ots);
      })
      .catch(reject);
  });
};

AQ.OperationType.all_with_field_types = AQ.OperationType.all_fast;

AQ.OperationType.numbers = function(user, filter) {
  var id = user ? user.id : null;

  return new Promise(function(resolve, resject) {
    AQ.get('/operation_types/numbers/' + id + '/' + filter).then(response => {
      resolve(response.data);
    });
  });
};

// RECORD METHODS ==================================================

AQ.OperationType.record_methods.upgrade_field_types = function() {
  this.field_types = aq.collect(this.field_types, ft => {
    var upgraded_ft = AQ.FieldType.record(ft);
    upgraded_ft.allowable_field_types = aq.collect(
      ft.allowable_field_types,
      aft => {
        var uaft = AQ.AllowableFieldType.record(aft);
        uaft.upgrade();
        return uaft;
      }
    );
    if (ft.allowable_field_types.length > 0) {
      upgraded_ft.current_aft_id = ft.allowable_field_types[0].id;
    }
    return upgraded_ft;
  });
};

AQ.OperationType.record_methods.num_inputs = function() {
  return aq.where(this.field_types, ft => {
    return ft.role === 'input';
  }).length;
};

AQ.OperationType.record_methods.num_outputs = function() {
  return aq.where(this.field_types, ft => {
    return ft.role === 'output';
  }).length;
};

AQ.OperationType.record_getters.inputs = function() {
  var ot = this;
  delete ot.inputs;

  ot.inputs = aq.where(ot.field_types, ft => ft.role == 'input');

  return ot.inputs;
};

AQ.OperationType.record_getters.outputs = function() {
  var ot = this;
  delete ot.outputs;

  ot.outputs = aq.where(ot.field_types, ft => ft.role == 'output');

  return ot.outputs;
};

AQ.OperationType.record_methods.io = function(name, role) {
  var fts = aq.where(
    this.field_types,
    ft => ft.name == name && ft.role == role
  );

  if (fts.length > 0) {
    return fts[0];
  } else {
    throw 'Attempted to access nonexistent ' + role + " named '" + name + "'";
  }
};

AQ.OperationType.record_methods.output = function(name) {
  return this.io(name, 'output');
};
AQ.OperationType.record_methods.input = function(name) {
  return this.io(name, 'input');
};

AQ.OperationType.record_methods.new_operation = function() {
  return new Promise(function(resolve, reject) {
    resolve('New Operation');
  });
};

AQ.OperationType.record_getters.stats = function() {
  var ot = this;

  delete ot.stats;
  ot.stats = {};

  AQ.get('/operation_types/' + ot.id + '/stats')
    .then(response => {
      ot.stats = response.data;
    })
    .catch(response => {
      console.log(['error', response.data]);
    });

  return {};
};

AQ.OperationType.record_methods.schedule = function(operations) {
  var op_ids = aq.collect(operations, op => {
    return op.id;
  });

  return new Promise(function(resolve, reject) {
    AQ.post('/operations/batch', { operation_ids: op_ids }).then(
      response => resolve(response.data.operations),
      response => reject(response.data.operations)
    );
  });
};

AQ.OperationType.record_methods.unschedule = function(operations) {
  var op_ids = aq.collect(operations, op => {
    return op.id;
  });

  return new Promise(function(resolve, reject) {
    AQ.post('/operations/unbatch', { operation_ids: op_ids }).then(
      response => resolve(response.data.operations),
      response => reject(response.data.operations)
    );
  });
};

/*
 * Returns the named component: protocol, documentation, cost_model, or precondition.
 */
AQ.OperationType.record_methods.code = function(component_name) {
  var operation_type = this;

  delete operation_type[component_name];
  operation_type[component_name] = {
    content: 'Loading ' + component_name,
    name: 'name',
    no_edit: true
  };

  AQ.Code.where({
    parent_class: 'OperationType',
    parent_id: operation_type.id,
    name: component_name
  }).then(codes => {
    if (codes.length > 0) {
      operation_type[component_name] = codes[codes.length - 1];
    } else {
      operation_type[component_name] = {
        content: '# Add code here.',
        name: 'name'
      };
    }
    AQ.update();
  });

  return operation_type[component_name];
};

AQ.OperationType.record_getters.protocol = function() {
  return this.code('protocol');
};

AQ.OperationType.record_getters.documentation = function() {
  return this.code('documentation');
};

AQ.OperationType.record_getters.cost_model = function() {
  return this.code('cost_model');
};

AQ.OperationType.record_getters.precondition = function() {
  return this.code('precondition');
};

AQ.OperationType.record_getters.field_types = function() {
  var ot = this;
  delete ot.field_types;
  ot.field_types = [];
  ot.loading_field_types = true;

  AQ.FieldType.where({ parent_class: 'OperationType', parent_id: ot.id }).then(
    fts => {
      ot.field_types = fts;
      ot.loading_field_types = false;
      AQ.update();
    }
  );

  return ot.field_types;
};

AQ.OperationType.record_getters.versions = function() {
  var ot = this;
  delete ot.versions;
  ot.versions = {
    protocol: [],
    cost_model: [],
    precondition: [],
    documentation: []
  };

  AQ.Code.where({
    parent_class: 'OperationType',
    parent_id: ot.id,
    name: 'protocol'
  }).then(protocols => {
    AQ.Code.where({
      parent_class: 'OperationType',
      parent_id: ot.id,
      name: 'precondition'
    }).then(pres => {
      AQ.Code.where({
        parent_class: 'OperationType',
        parent_id: ot.id,
        name: 'cost_model'
      }).then(costs => {
        AQ.Code.where({
          parent_class: 'OperationType',
          parent_id: ot.id,
          name: 'documentation'
        }).then(docs => {
          ot.versions = {
            protocol: protocols.reverse(),
            cost_model: costs.reverse(),
            precondition: pres.reverse(),
            documentation: docs.reverse()
          };
          AQ.update();
        });
      });
    });
  });

  return ot.versions;
};

AQ.OperationType.record_methods.remove_predecessors = function() {
  // This method can be used to remove references to predecessors in field types
  // so that the resulting object is guaranteed not to be circular
  var ot = this;
  aq.each(ot.field_types, ft => {
    delete ft.predecessors;
  });
  return ot;
};

AQ.OperationType.record_getters.rendered_docs = function() {
  var operation_type = this;
  var md = window.markdownit();
  var docs = 'Rendering...';

  delete operation_type.rendered_docs;

  AQ.Code.where({
    parent_class: 'OperationType',
    parent_id: operation_type.id,
    name: 'documentation'
  }).then(codes => {
    if (codes.length > 0) {
      docs = codes[codes.length - 1];
    } else {
      docs = { content: '# Add code here.', name: 'name' };
    }
    operation_type.rendered_docs = AQ.sce.trustAsHtml(md.render(docs.content));
    AQ.update();
  });

  return AQ.sce.trustAsHtml('Rendering ...');
};

AQ.OperationType.record_methods.set_default_timing = function() {
  var ot = this;
  ot.timing = AQ.Timing.default();
  ot.timing.parent_class = 'OperationType';
  ot.timing.parent_id = ot.id;
  return ot;
};

AQ.OperationType.timing_sort_compare = function(ot1, ot2) {
  return (
    (ot1.timing ? ot1.timing.start : 10000) -
    (ot2.timing ? ot2.timing.start : 10000)
  );
};

AQ.OperationType.sort_by_timing = function(ots) {
  return ots.sort(AQ.OperationType.timing_sort_compare);
};

AQ.OperationType.find_cached = function(name) {
  if (AQ.operation_types) {
    return aq.find(AQ.operation_types, ot => ot.name == name);
  } else {
    return null;
  }
};

AQ.OperationType.record_methods.create = function(
  parent_module_id = 0,
  x = 100,
  y = 100
) {
  return AQ.Operation.new_operation(this, parent_module_id, x, y);
};

//
// app/assets/javascripts/models/operation_validation.js
//

/*
 * This method checks that an operation's information is consistent, all
 * routing and fields are consistent, etc.
 */

AQ.Operation.record_methods.valid = function() {
  let operation = this,
    valid = true;

  /*
   * Check that all field values that are defined have associated
   * routing defined.
   */

  operation.field_values.forEach(field_value => {
    if (!field_value.field_type.array && field_value.child_sample_id) {
      valid =
        valid && operation.routing[field_value.routing] == field_value.sid;
    }
  });

  return valid;
};

/*
 * Check that all operations are valid
 */
AQ.Plan.record_methods.check_operations = function() {
  let plan = this;
  plan.operations.forEach(operation => {
    if (!operation.valid()) {
      raise('Operation ' + operation.id + ' not valid.');
    }
  });
  return plan;
};

//
// app/assets/javascripts/models/parameter.js
//

//
// app/assets/javascripts/models/part_association.js
//

AQ.PartAssociation.record_methods.upgrade = function(raw_data) {
  let pa = this;

  if (raw_data.part) {
    pa.part = AQ.Item.record(pa.part);
  }
  if (raw_data.collection) {
    pa.collection = AQ.Collection.record(pa.collection);
  }
};

//
// app/assets/javascripts/models/plan.js
//

AQ.Plan.new_plan = function(name) {
  var plan = AQ.Plan.record({
    operations: [],
    wires: [],
    status: 'planning',
    name: name
  });

  plan.create_base_module();
  return plan;
};

AQ.Plan.record_methods.add_operation = function(operation) {
  let plan = this;
  plan.operations.push(operation);
  operation.plan = plan;
  return plan;
};

AQ.Plan.record_methods.reload = function() {
  var plan = this;
  plan.recompute_getter('data_associations');

  AQ.PlanAssociation.where({ plan_id: plan.id }).then(pas => {
    AQ.Operation.where(
      { id: aq.collect(pas, pa => pa.operation_id) },
      { methods: ['field_values', 'operation_type', 'jobs'] }
    ).then(ops => {
      plan.operations = ops;
      plan.recompute_getter('costs');
      aq.each(plan.operations, op => {
        op.field_values = aq.collect(op.field_values, fv => {
          return AQ.FieldValue.record(fv);
        });
        op.jobs = aq.collect(op.jobs, job => {
          return AQ.Job.record(job);
        });
        op.reload().then(op => {
          op.open = false;
          AQ.update();
        });
      });
      plan.recompute_getter('deletable');
      plan.recompute_getter('state');
      plan.recompute_getter('cost_so_far');
    });
  });
};

AQ.Plan.record_methods.save = function(user) {
  var plan = this,
    before = plan,
    user_query = user ? '?user_id=' + user.id : '';

  plan.saving = true;

  if (plan.id) {
    return new Promise((resolve, reject) => {
      AQ.put('/plans/' + plan.id + '.json' + user_query, plan.serialize())
        .then(response => {
          delete plan.saving;
          var p = AQ.Plan.record(response.data).marshall();
          AQ.Test.plan_diff(before, p);
          resolve(p);
        })
        .catch(response => {
          console.log(response);
          plan.errors = ['PUT error'];
        });
    });
  } else {
    return new Promise((resolve, reject) => {
      AQ.post('/plans.json' + user_query, plan.serialize())
        .then(response => {
          delete plan.saving;
          var p = AQ.Plan.record(response.data).marshall();
          AQ.Test.plan_diff(before, p);
          resolve(p);
        })
        .catch(response => {
          console.log(response.data.errors);
          plan.errors = response.data.errors;
        });
    });
  }
};

AQ.Plan.load = function(id) {
  let start_time = new Date();
  return new Promise((resolve, reject) => {
    AQ.get('/plans/' + id + '.json')
      .then(response => {
        try {
          resolve(
            AQ.Plan.record(response.data)
              .marshall()
              .assign_items()
          );
          console.log(`Plan ${id} loaded in ${new Date() - start_time} ms`);
        } catch (e) {
          reject(e);
        }
      })
      .catch(response => reject(response.data));
  });
};

AQ.Plan.record_getters.unassigned_inputs = function() {
  let plan = this,
    fvs = [];

  aq.each(plan.operations, op => {
    if (op.status == 'planning') {
      aq.each(op.inputs, fv => {
        if (!fv.child_item_id && fv.num_wires == 0) {
          fvs.push(fv);
        }
      });
    }
  });

  return fvs;
};

AQ.Plan.record_methods.assign_items = function() {
  let plan = this;

  aq.each(plan.unassigned_inputs, input => {
    input.find_items().then(() => AQ.update());
  });

  return plan;
};

AQ.Plan.record_methods.submit = function(user) {
  var original_plan = this,
    plan = this.serialize(),
    user_query = user ? '&user_id=' + user.id : '',
    budget_query = '?budget_id=' + this.uba.budget_id;

  return AQ.get(
    '/plans/start/' + plan.id + budget_query + user_query,
    plan
  ).then(response => original_plan); // caller should reload the plan if needed to get updated operation status
};

AQ.Plan.record_methods.cancel = function(msg) {
  var plan = this;

  return new Promise(function(resolve, reject) {
    AQ.get('/plans/cancel/' + plan.id + '/' + msg).then(
      response => {
        plan.reload();
        resolve(response.data);
        plan.recompute_getter('deletable');
        plan.recompute_getter('state');
      },
      response => {
        reject(response.data.errors);
      }
    );
  });
};

AQ.Plan.record_methods.link_operation_types = function(operation_types) {
  aq.each(this.operations, operation => {
    operation.operation_type = aq.find(operation_types, ot => {
      return ot.id == operation.operation_type.id;
    });
  });
};

AQ.Plan.list = function(offset, user, folder, plan_id) {
  var user_query = user ? '&user_id=' + user.id : '',
    plan_query = plan_id ? '&plan_id=' + plan_id : '',
    folder_query = folder ? '&folder=' + folder : '';

  return new Promise(function(resolve, reject) {
    AQ.get(
      '/launcher/plans?offset=' +
        offset +
        user_query +
        plan_query +
        folder_query
    ).then(
      response => {
        AQ.Plan.num_plans = response.data.num_plans;
        resolve(
          aq.collect(response.data.plans, p => {
            var plan = AQ.Plan.record(p);
            plan.operations = aq.collect(plan.operations, op => {
              var operation = AQ.Operation.record(op);
              operation.mode = 'io'; // This is for the launcher UI.
              operation.field_values = aq.collect(
                aq.where(response.data.field_values, fv => {
                  return fv.parent_id == operation.id;
                }),
                fv => {
                  return AQ.FieldValue.record(fv);
                }
              );
              operation.jobs = aq.collect(op.jobs, job => {
                return AQ.Job.record(job);
              });
              return operation;
            });
            return plan;
          })
        );
      },
      response => {
        reject(response.data.errors);
      }
    );
  });
};

AQ.Plan.record_methods.wire = function(from_op, from, to_op, to) {
  var plan = this;

  if (!plan.wires) {
    plan.wires = [];
  }

  var wire = AQ.Wire.make({
    from_op: from_op,
    from: from,
    to_op: to_op,
    to: to
  });

  plan.wires.push(wire);

  return wire;
};

AQ.Plan.record_methods.unwire = function(op) {
  var plan = this;

  aq.each(plan.wires, wire => {
    if (wire.from_op == op || wire.to_op == op) {
      wire.disconnect();
      aq.remove(plan.wires, wire);
    }
  });
};

AQ.Plan.record_methods.remove_wires_to = function(op, fv) {
  var plan = this;

  aq.each(plan.wires, wire => {
    if (wire.to_op == op && wire.to == fv) {
      wire.disconnect();
      aq.remove(plan.wires, wire);
    }
  });

  return plan;
};

AQ.Plan.record_methods.remove_wires_from = function(op, fv) {
  var plan = this;

  aq.each(plan.wires, wire => {
    if (wire.from_op == op && wire.from == fv) {
      wire.disconnect();
      aq.remove(plan.wires, wire);
    }
  });

  return plan;
};

AQ.Plan.record_methods.is_wired = function(op, fv) {
  var plan = this,
    found = false;

  aq.each(plan.wires, wire => {
    if (wire.to_op == op && wire.to == fv) {
      found = true;
    }
  });

  return found;
};

AQ.Plan.record_methods.siblings = function(fv) {
  var plan = this,
    from_module_io,
    sibs = [];

  aq.each(plan.base_module.all_wires, wire => {
    if (wire.to == fv && wire.from_module) {
      from_module_io = wire.from;
    }
  });

  aq.each(plan.base_module.all_wires, wire => {
    if (
      wire.to != fv &&
      wire.to.record_type == 'FieldValue' &&
      wire.from == from_module_io
    ) {
      sibs.push({ fv: wire.to, op: wire.to_op });
    }
  });

  return sibs;
};

AQ.Plan.record_methods.add_wire_from = function(fv, op, pred) {
  // pred is expected to be of the form { operation_type: ___, output: ___}

  let plan = this,
    preop = AQ.Operation.new_operation(
      pred.operation_type,
      plan.current_module.id,
      op.x,
      op.y + 4 * AQ.snap
    ),
    preop_output = preop.output(pred.output.name);

  let num_wires_into = aq.where(op.plan.wires, wire => wire.to_op == op).length;

  plan.add_operation(preop);
  preop.x += (preop.width + AQ.snap) * num_wires_into;

  plan.remove_wires_to(op, fv);

  let wire = plan.wire(preop, preop_output, op, fv),
    sid = null;

  if (fv.field_type.array) {
    sid = fv.sample_identifier;
  } else {
    sid = op.routing[fv.routing];
  }

  if (sid) {
    return AQ.Sample.find_by_identifier(sid)
      .then(sample => plan.assign(fv, sample))
      .then(plan => plan.choose_items());
  } else {
    return Promise.resolve(plan);
  }
};

AQ.Plan.record_methods.add_wire_to = function(fv, op, suc) {
  let plan = this,
    postop = AQ.Operation.new_operation(
      suc.operation_type,
      plan.current_module.id,
      op.x,
      op.y - 4 * AQ.snap
    ),
    postop_input = postop.input(suc.input.name);

  let num_wires_outof = aq.where(op.plan.wires, wire => wire.from_op == op)
    .length;

  plan.add_operation(postop);
  postop.x += (postop.width + AQ.snap) * num_wires_outof;

  plan.remove_wires_from(op, fv);

  let wire = plan.wire(op, fv, postop, postop_input);

  if (fv.field_type.array) {
    sid = fv.sample_identifier;
  } else {
    sid = op.routing[fv.routing];
  }

  if (op.status == 'planning' && sid) {
    return AQ.Sample.find_by_identifier(sid)
      .then(sample => plan.assign(fv, sample))
      .then(plan => plan.choose_items());
  } else {
    return Promise.resolve(plan);
  }

  return Promise.resolve(plan);
};

AQ.Plan.record_methods.remove_wire = function(wire) {
  var plan = this;
  wire.disconnect();
  aq.remove(plan.wires, wire);
};

AQ.Plan.record_methods.debug = function() {
  var plan = this;
  plan.debugging = true;

  return AQ.get('/plans/' + plan.id + '/debug')
    .then(response => {
      plan.reload();
      plan.debugging = false;
      plan.recompute_getter('state');
    })
    .then(() => plan);
};

AQ.Plan.record_methods.relaunch = function() {
  var plan = this;

  return new Promise(function(resolve, reject) {
    AQ.get('/launcher/' + plan.id + '/relaunch').then(
      response => {
        var p = AQ.Plan.record(response.data.plan).marshall();
        resolve(p, response.data.issues);
      },
      response => reject(null, response.data.issues)
    );
  });
};

AQ.Plan.getter(AQ.Budget, 'budget');

AQ.Plan.record_methods.wire_aux = function(op, wires, operations) {
  var plan = this;

  aq.each(wires, w => {
    var fv = op.field_value_with_id(w.to_id);
    if (fv) {
      aq.each(operations, from_op => {
        var from_fv = from_op.field_value_with_id(w.from_id);
        if (from_fv) {
          var new_from_op = from_op.copy(),
            new_from_fv = new_from_op.field_value_like(from_fv);
          plan
            .wire(new_from_op, new_from_fv, op, fv)
            .wire_aux(new_from_op, wires, operations);
        }
      });
    }
  });
};

AQ.Plan.record_methods.copy = function() {
  var old_plan = this;

  return new Promise(function(resolve, reject) {
    AQ.Plan.where({ id: old_plan.id }, { methods: ['wires', 'goals'] }).then(
      plans => {
        var plan = AQ.Plan.record(plans[0]),
          new_plan = AQ.Plan.record({});

        new_plan.operations = aq.collect(plan.goals, g => {
          return AQ.Operation.record(g).copy();
        });

        aq.each(new_plan.operations, op => {
          new_plan.wire_aux(op, plans[0].wires, old_plan.operations);
        });

        resolve(new_plan);
      }
    );
  });
};

AQ.Plan.record_getters.deletable = function() {
  var plan = this;

  delete plan.deletable;
  plan.deletable = true;

  aq.each(plan.operations, op => {
    if (op.status != 'error' || op.jobs === undefined || op.jobs.length > 0) {
      plan.deletable = false;
    }
  });

  return plan.deletable;
};

AQ.Plan.record_methods.valid = function() {
  var plan = this,
    v = plan.operations.length > 0;

  aq.each(plan.operations, op => {
    if (op.status != 'error') {
      aq.each(op.field_values, fv => {
        v = v && fv.valid();
      });
    }
  });

  aq.each(plan.wires, wire => {
    v = v && wire.consistent();
  });

  return v;
};

AQ.Plan.record_methods.destroy = function() {
  var plan = this;

  return new Promise(function(resolve, reject) {
    AQ.http.delete('/plans/' + plan.id);
    resolve();
  });
};

AQ.Plan.move = function(plans, folder) {
  var pids = aq.collect(plans, plan => plan.id);

  return new Promise(function(resolve, reject) {
    AQ.http
      .put('/plans/move', { pids: pids, folder: folder })
      .then(() => {
        aq.each(plans, plan => {
          plan.folder = folder;
        });
        resolve();
      })
      .catch(reject);
  });
};

AQ.Plan.get_folders = function(user_id = null) {
  return new Promise(function(resolve, reject) {
    var user_query = user_id ? '?user_id=' + user_id : '';

    AQ.get('/plans/folders' + user_query)
      .then(response => {
        resolve(response.data.sort());
      })
      .catch(reject);
  });
};

AQ.Plan.record_getters.state = function() {
  var plan = this;
  delete plan.state;
  plan.state = 'Pending';

  // if all ops are done, the done
  var not_done = aq.where(plan.operations, op => op.status != 'done');
  var errors = aq.where(plan.operations, op => op.status == 'error');
  var delays = aq.where(plan.operations, op => op.status == 'delayed');

  if (not_done.length == 0) {
    plan.state = 'Done';
  } else if (errors.length > 0) {
    plan.state = 'Error';
  } else if (delays.length > 0) {
    plan.state = 'Delayed';
  }

  return plan.state;
};

AQ.Plan.record_methods.find_items = function() {
  var plan = this;

  aq.each(plan.operations, op => {
    aq.each(op.field_values, fv => {
      fv.recompute_getter('items');
    });
  });
};

AQ.Plan.record_methods.check_for_items = function() {
  var plan = this;

  aq.each(plan.operations, op => {
    aq.each(op.field_values, fv => {
      if (fv.items.length == 0) {
        fv.recompute_getter('items');
      }
    });
  });
};

AQ.Plan.record_methods.replan = function() {
  var plan = this;

  return new Promise(function(resolve, reject) {
    AQ.get('/plans/replan/' + plan.id)
      .then(response => {
        resolve(response.data);
      })
      .catch(reject);
  });
};

AQ.Plan.record_methods.find_by_rid = function(rid) {
  var plan = this,
    object = null;

  aq.each(plan.operations, op => {
    if (op.rid == rid) {
      object = op;
    } else {
      aq.each(op.field_values, fv => {
        if (fv.rid == rid) {
          object = fv;
        }
      });
    }
  });

  return object;
};

AQ.Plan.record_methods.find_by_id = function(id) {
  var plan = this,
    object = null;

  aq.each(plan.operations, op => {
    if (op.id == id) {
      object = op;
    } else {
      aq.each(op.field_values, fv => {
        if (fv.id == id) {
          object = fv;
        }
      });
    }
  });

  return object;
};

AQ.Plan.record_methods.add_wire = function(from, from_op, to, to_op) {
  if (from.role == 'output' && from.field_type.can_produce(to)) {
    if (!this.reachable(to, from)) {
      this.wires.push(
        AQ.Wire.make({
          from_op: from_op,
          from: from,
          to_op: to_op,
          to: to,
          snap: AQ.snap
        })
      );
    } else {
      alert('Cycle detected. Cannot create wire.');
    }
  } else if (to.role == 'output' && to.field_type.can_produce(from)) {
    // #TODO: determine whether this is legit. Seems wrong.
    if (!this.reachable(from, to)) {
      this.wires.push(
        AQ.Wire.make({
          to_op: from_op,
          to: from,
          from_op: to_op,
          from: to,
          snap: AQ.snap
        })
      );
    } else {
      alert('Cycle detected. Cannot create wire.');
    }
  }
};

AQ.Plan.record_methods.num_plan_wires_into = function(io) {
  var plan = this;
  return aq.where(plan.wires, w => w.to.rid == io.rid).length;
};

AQ.Plan.record_methods.num_module_wires_into = function(io) {
  return this.base_module.num_wires_into(io);
};

AQ.Plan.record_methods.num_wires_into = function(io) {
  var plan = this;
  return plan.num_plan_wires_into(io) + plan.num_module_wires_into(io);
};

AQ.Plan.record_methods.recount_fv_wires = function() {
  var plan = this;

  aq.each(plan.operations, op => {
    aq.each(op.field_values, fv => {
      fv.num_wires = 0;
    });
  });

  aq.each(plan.wires, w => {
    w.from.num_wires++;
    w.to.num_wires++;
  });
};

AQ.Plan.record_methods.create_text_box = function() {
  let plan = this;
  return plan.current_module.create_text_box();
};

AQ.Plan.record_methods.parent_operation = function(field_value) {
  let plan = this;
  for (var i = 0; i < plan.operations.length; i++) {
    for (var j = 0; j < plan.operations[i].field_values.length; j++) {
      if (plan.operations[i].field_values[j] == field_value) {
        return plan.operations[i];
      }
    }
  }
  return null;
};

AQ.Plan.record_getters.leaves = function() {
  let plan = this;
  plan.mark_leaves();
  return aq.where(plan.field_values(), fv => fv.leaf);
};

AQ.Plan.record_methods.choose_items = function() {
  let plan = this;

  return Promise.all(
    aq.collect(plan.leaves, fv => fv.find_items(fv.child_sample_id))
  ).then(() => {
    return plan;
  });
};

AQ.Plan.record_methods.show_assignments = function() {
  var plan = this;

  plan.field_values().forEach(fv => {
    let str = fv.name + ': ' + fv.sid;
    if (fv.child_item_id) {
      str += ', item id = ' + fv.child_item_id;
      if (typeof fv.row == 'number' && typeof fv.column == 'number') {
        str += `[${fv.row}, ${fv.column}]`;
      }
    }
    console.log(str);
  });

  return plan;
};

AQ.Plan.record_methods.operation = function(type_name, index = 0) {
  let plan = this,
    operations = aq.where(
      plan.operations,
      op => op.operation_type.name == type_name
    );

  if (operations.length > index) {
    return operations[index];
  } else {
    raise(
      `Could not find operation ${index} of type '${type_name}' in plan '${plan.name}'`
    );
  }
};

/* Returns true if this plan has active operations and new, inactive, operations.
 */
AQ.Plan.record_getters.has_new_ops = function() {
  let active = aq.where(this.operations, op => op.status != 'planning').length,
    inactive = aq.where(this.operations, op => op.status == 'planning').length;

  return active > 0 && inactive > 0;
};

AQ.Plan.record_getters.saved = function() {
  var plan = this;

  if (!plan.id) {
    return false;
  } else {
    for (var i = 0; i < plan.operations.length; i++) {
      if (!plan.operations[i].id) {
        return false;
      }
    }
  }

  return true;
};

AQ.Plan.record_methods.step_operations = function() {
  console.log('AQ.Plan.step()');
  return AQ.get('/operations/step?plan_id=' + this.id);
};

AQ.Plan.record_getters.link = function() {
  let plan = this;
  return window.location.href.split('#')[0] + '?plan_id=' + plan.id;
};

//
// app/assets/javascripts/models/plan_costs.js
//

AQ.Plan.record_methods.cost_to_amount = function(c) {
  c.base = c.materials + c.labor * c.labor_rate;
  c.total = c.base * (1.0 + c.markup_rate);
  return c.total;
};

AQ.Plan.record_methods.estimate_cost = function() {
  var plan = this;

  if (!plan.estimating) {
    plan.estimating = true;
    var serializeed_plan = plan.serialize();

    return AQ.post('/launcher/estimate', serializeed_plan)
      .then(response => {
        if (response.data.errors) {
          plan.cost = { error: response.data.errors };
        } else {
          var errors = [];

          plan.cost = {
            messages: response.data.messages,
            costs: response.data.costs,
            total: aq.sum(response.data.costs, c => {
              if (c.error) {
                errors.push(c.error.replace(/\(eval\)/g, 'cost'));
                return 0;
              } else {
                return plan.cost_to_amount(c);
              }
            })
          };

          if (errors.length > 0) {
            plan.cost.error = errors.join(', ');
          }
        }

        aq.each(plan.operations, op => {
          aq.each(response.data.costs, cost => {
            if (op.id == cost.id) {
              if (!cost.error) {
                op.cost = cost.total;
              } else {
                op.cost = cost.error;
              }
            }
          });
        });

        plan.base_module.compute_cost(plan);

        plan.estimating = false;
      })
      .then(() => plan);
  } else {
    return Promise.resolve(plan);
  }
};

AQ.Plan.record_getters.cost_total = function() {
  delete this.cost_total;
  this.costs;
};

AQ.Plan.record_getters.transactions = function() {
  delete this.transactions;
  this.cost_so_far; // this will fetch plan.transactions when called te first time
  return []; // return a temporary empty list for views to use
};

AQ.Plan.record_getters.cost_so_far = function() {
  let plan = this,
    opids = aq.collect(plan.operations, op => op.id);

  delete plan.cost_so_far;

  AQ.Account.where({ operation_id: opids }).then(transactions => {
    plan.transactions = transactions;
    plan.cost_so_far = 0.0;
    aq.each(plan.operations, op => (op.cost_so_far = 0));
    aq.each(transactions, t => {
      if (t.transaction_type == 'debit') {
        let amount = t.amount * (1 + t.markup_rate);
        plan.cost_so_far += amount;
        aq.each(plan.operations, op => {
          if (t.operation_id == op.id) {
            op.cost_so_far += amount;
          }
        });
      } else {
        plan.cost_so_far -= amount;
        aq.each(plan.operations, op => {
          if (t.operation_id == op.id) {
            op.cost_so_far -= amount;
          }
        });
      }
    });
    AQ.update();
  });

  return plan.cost_so_far;
};

AQ.Plan.record_getters.costs = function() {
  var plan = this;
  delete plan.costs;
  plan.costs = [];

  AQ.get('/plans/costs/' + plan.id).then(response => {
    plan.costs = response.data;
    plan.cost_total = 0;

    aq.each(plan.costs, cost => {
      aq.each(plan.operations, op => {
        if (cost.id == op.id) {
          cost.total = plan.cost_to_amount(cost);
          op.cost = cost.total;
          plan.cost_total += plan.cost_to_amount(cost);
        }
      });
    });
  });

  return plan.costs;
};

//
// app/assets/javascripts/models/plan_paste.js
//

AQ.Plan.record_methods.paste_plan = function(p, offset) {
  var plan = this;

  plan.paste_module(p, offset);

  aq.each(plan.operations, op => (op.multiselect = false));
  aq.each(p.operations, op => {
    plan.paste_operation(op, offset);
  });

  aq.each(p.wires, w => {
    delete w.id;
    delete w.from_id;
    delete w.to_id;
    delete w.parent_id;
    plan.wires.push(w);
  });

  return plan;
};

AQ.Plan.record_methods.paste_module = function(p, offset) {
  var plan = this,
    module_id_map;

  Module.id_map = [];

  p.base_module.renumber();
  aq.each(p.base_module.children, c => {
    c.x += offset;
    c.y += offset;
  });
  aq.each(p.base_module.children, c => (c.multiselect = true));
  plan.current_module.merge(p.base_module);

  Module.id_map[0] = plan.current_module.id;

  aq.each(p.operations, op => {
    op.parent_id = Module.id_map[op.parent_id];
  });
};

AQ.Plan.record_methods.paste_operation = function(op, offset) {
  var plan = this,
    new_op = op;

  delete new_op.id;
  new_op.multiselect = true;

  if (new_op.parent_id == 0) {
    new_op.x += offset;
    new_op.y += offset;
  }

  aq.each(new_op.field_values, fv => {
    delete fv.child_item_id;
    delete fv.row;
    delete fv.column;
    delete fv.id;
    delete fv.parent_id;
    fv.recompute_getter('items');
    return fv;
  });

  new_op.recompute_getter('types_and_values');
  new_op.recompute_getter('inputs');

  plan.add_operation(new_op);

  return plan;
};

//
// app/assets/javascripts/models/reachability.js
//

AQ.Plan.record_methods.reachable = function(a, b) {
  var plan = this;

  // Unmark all fvs
  plan.unmark();

  if (a.role == 'input') {
    return plan.reachable_aux(plan.parent_of(a), a, b);
  } else {
    return plan.reachable_aux(plan.parent_of(b), b, a);
  }
};

AQ.Plan.record_methods.unmark = function(a, b) {
  var plan = this;

  aq.each(plan.operations, op => {
    aq.each(op.field_values, fv => {
      fv._marked = false;
    });
  });
};

AQ.Plan.record_methods.parent_of = function(x) {
  var plan = this,
    parent;

  aq.each(plan.operations, op => {
    aq.each(op.field_values, fv => {
      if (fv == x) {
        parent = op;
      }
    });
  });

  return parent;
};

AQ.Plan.record_methods.wires_out = function(op) {
  var plan = this,
    wires = [];

  aq.each(op.field_values, fv => {
    aq.each(plan.wires, w => {
      if (w.from_op == op) {
        wires.push(w);
      }
    });
  });

  return wires;
};

AQ.Plan.record_methods.wires_from = function(fv) {
  var plan = this;
  return aq.where(plan.wires, w => w.from == fv);
};

AQ.Operation.record_methods.is_output = function(fv) {
  return this.outputs.includes(fv);
};

AQ.Plan.record_methods.reachable_aux = function(op, a, b) {
  // expects that a is an input of op and b is an output of some possibly different op

  var plan = this;

  if (a._marked) {
    return false;
  } else if (op.is_output(b)) {
    // b is an output of the op containing a
    return true;
  } else {
    var wires = plan.wires_out(op);

    if (wires.length == 0) {
      // there are no output wires from the op containing fv
      return false;
    } else {
      var result = false;

      a._marked = true;

      // for each output o of the op containing a
      aq.each(op.outputs, ofv => {
        // for each wire ofv => x
        aq.each(plan.wires_from(ofv), wire => {
          result = result || plan.reachable_aux(wire.to_op, wire.to, b);
        });
      });
    }

    return result;
  }
};

//
// app/assets/javascripts/models/record.js
//

AQ.Record = function(model, data) {
  var record = this;
  this.model = model;

  for (var method_name in model.record_methods) {
    record[method_name] = (function(mname) {
      return function() {
        var args = Array.prototype.slice.call(arguments);
        return model.record_methods[mname].apply(record, args);
      };
    })(method_name);
  }

  for (fname in AQ.DataAssociation.base_methods) {
    model.record_methods[fname] = AQ.DataAssociation.base_methods[fname];
  }

  for (fname in AQ.DataAssociation.base_getters) {
    model.record_getters[fname] = AQ.DataAssociation.base_getters[fname];
  }

  model.record_getters.record_type = function() {
    return this.model.model;
  };

  for (var method_name in model.record_getters) {
    Object.defineProperty(record, method_name, {
      get: model.record_getters[method_name],
      configurable: true
    });
  }

  if (data) {
    record.init(data);
  }

  record.rid = AQ.next_record_id++;
};

AQ.Record.prototype.recompute_getter = function(gname) {
  delete this['_' + gname];
  Object.defineProperty(this, gname, {
    get: this.model.record_getters[gname],
    configurable: true
  });
  return this[gname];
};

AQ.Record.prototype.init = function(data) {
  for (var key in data) {
    if (key != 'rid' && typeof data[key] != 'function') {
      delete this[key];
      this[key] = data[key];
    }
  }
  return this;
};

AQ.Record.prototype.save = function() {
  var record = this;

  return new Promise(function(resolve, reject) {
    AQ.post('/json/save', record, {
      withCredentials: true,
      processData: false
    }).then(
      response => {
        if (!record.id) {
          record.id = response.data.id;
          record.created_at = response.data.created_at;
        }
        record.updated_at = response.data.updated_at;
        record.unsaved = null;
        resolve(record);
      },
      response => {
        reject(response.data.errors);
      }
    );
  });
};

AQ.Record.prototype.delete = function() {
  var record = this;

  return new Promise(function(resolve, reject) {
    AQ.post('/json/delete', record).then(
      response => {
        resolve(record);
      },
      response => {
        reject(response.data.errors);
      }
    );
  });
};

AQ.Record.prototype.drop = function(da) {
  if (typeof this.data_associations == 'object') {
    aq.remove(this.data_associations, da);
    AQ.update();
  }
};

AQ.Record.prototype.delete_data_association = function(da) {
  if (AQ.confirm('Are you sure you want to delete this datum?')) {
    da.delete().then(() => {
      if (typeof this.data_associations == 'object') {
        aq.remove(this.data_associations, da);
        AQ.update();
      }
    });
  }
};

AQ.Record.prototype.new_data_association = function() {
  var da = AQ.DataAssociation.record({
    unsaved: true,
    key: 'key',
    value: undefined,
    new_value: '',
    parent_class: this.model.model,
    parent_id: this.id
  });

  if (this.data_associations) {
    this.data_associations.push(da);
  }

  return da;
};

AQ.Record.prototype.process_upload_complete = function() {
  let record = this;
  console.log('Completed upload!', record);
};

//
// app/assets/javascripts/models/sample.js
//

AQ.Sample.record_getters.identifier = function() {
  var s = this;
  delete s.identifier;
  s.identifier = s.id + ': ' + s.name;
  return s.identifier;
};

AQ.Sample.getter(AQ.User, 'user');

AQ.Sample.getter(AQ.SampleType, 'sample_type');

AQ.Sample.record_methods.upgrade = function() {
  let sample = this;

  if (sample.field_values) {
    for (var i = 0; i < sample.field_values.length; i++) {
      sample.field_values[i] = AQ.FieldValue.record(sample.field_values[i]);
    }
  }

  if (sample.sample_type) {
    sample.sample_type = AQ.SampleType.record(sample.sample_type);
  }

  return this;
};

AQ.Sample.record_methods.field_value = function(name) {
  let sample = this;
  return aq.find(sample.field_values, fv => fv.name == name);
};

AQ.Sample.record_methods.complete_sample_type = function() {
  let sample = this;
  if (AQ.sample_type_cache[sample.sample_type_id]) {
    sample.sample_type = AQ.sample_type_cache[sample.sample_type_id];
    return sample;
  } else {
    return AQ.FieldType.where({
      parent_class: 'SampleType',
      parent_id: sample.sample_type.id
    }).then(field_types => {
      sample.sample_type.field_types = field_types;
      AQ.sample_type_cache[sample.sample_type_id] = sample.sample_type;
      return sample;
    });
  }
};

/* This method is used by the planner autocomplete method and planner assign methods,
 * which is why it incluees field values (so subsamples can be looked up).
 */
AQ.Sample.find_by_identifier = function(sid) {
  let sample_id = AQ.id_from(sid);

  if (sample_id) {
    if (AQ.sample_cache[sample_id]) {
      return Promise.resolve(AQ.sample_cache[sample_id]);
    } else {
      return AQ.Sample.where(
        { id: sample_id },
        { methods: ['field_values'], include: ['sample_type'] }
      )
        .then(aq.first)
        .then(sample => sample.complete_sample_type())
        .then(sample => (AQ.sample_cache[sample.id] = sample));
    }
  } else {
    return Promise.reject('Could not find sample ' + sid);
  }
};
//
// app/assets/javascripts/models/sample_type.js
//

AQ.SampleType.record_methods.sample_names = function(substring) {
  var st = this,
    sids;

  sids = aq.where(AQ.sample_names_for(this.name), sn => sn.includes(substring));

  return sids;
};

AQ.SampleType.record_methods.get_field_types = function() {
  let st = this;

  return AQ.FieldType.where({
    parent_class: 'SampleType',
    parent_id: st.id
  });
};
//
// app/assets/javascripts/models/serialize.js
//

AQ.Plan.record_methods.serialize = function() {
  var plan = this,
    ops;

  p = {
    id: plan.id,
    operations: aq.collect(plan.operations, op => op.serialize()),
    wires: aq.collect(plan.wires, w => w.serialize()),
    user_budget_association: plan.uba,
    status: plan.status,
    cost_limit: plan.cost_limit,
    name: plan.name,
    rid: plan.rid,
    layout: plan.serialize_module(plan.base_module)
  };

  return p;
};

AQ.Plan.record_methods.serialize_module = function(m) {
  var plan = this,
    props = [
      'id',
      'parent_id',
      'name',
      'x',
      'y',
      'width',
      'height',
      'model',
      'input',
      'output',
      'documentation'
    ],
    sm = {};

  for (var p in props) {
    sm[props[p]] = m[props[p]];
  }

  sm.input = aq.collect(m.input, i => plan.serialize_module_io(i));
  sm.output = aq.collect(m.output, o => plan.serialize_module_io(o));
  sm.children = aq.collect(m.children, c => plan.serialize_module(c));
  sm.wires = aq.collect(m.wires, w => w.serialize());
  sm.text_boxes = aq.collect(m.text_boxes, box => box.serialize());

  return sm;
};

AQ.Plan.record_methods.serialize_module_io = function(io) {
  var plan = this,
    props = ['id', 'x', 'y', 'width', 'height', 'model'],
    sio = {};

  for (var p in props) {
    sio[props[p]] = io[props[p]];
  }

  return sio;
};

AQ.Operation.record_methods.serialize = function() {
  var op = this;

  return {
    id: op.id,
    operation_type_id: op.operation_type_id,
    field_values: aq.collect(op.field_values, fv => {
      var efv = fv.serialize();
      efv.allowable_field_type_id =
        op.form[fv.role][fv.name] && op.form[fv.role][fv.name].aft
          ? op.form[fv.role][fv.name].aft.id
          : null;
      if (!fv.field_type.array && fv.routing) {
        op.assign_sample(efv, op.routing[fv.routing]);
      }
      return efv;
    }),
    status: op.status,
    user_id: op.user_id,
    x: op.x,
    y: op.y,
    routing: op.routing,
    rid: op.rid,
    parent_id: op.parent_id
  };
};

AQ.FieldValue.record_methods.serialize = function() {
  var fv = this,
    props = [
      'id',
      'name',
      'child_item_id',
      ,
      'child_sample_id',
      'value',
      'role',
      'field_type_id',
      'item',
      'row',
      'column',
      'parent_class',
      'parent_id',
      'routing',
      'rid'
    ],
    efv = {};

  aq.each(props, p => (efv[p] = fv[p]));

  if (fv.field_type.array) {
    efv.array = true;
  }

  return efv;
};

AQ.Wire.record_methods.serialize = function() {
  var w = this;

  return {
    id: w.id,
    from_id: w.from_id,
    to_id: w.to_id,
    from: { rid: this.from.rid },
    to: { rid: this.to.rid },
    active: w.active,
    rid: w.rid
  };
};

//
// app/assets/javascripts/models/test.js
//

AQ.Test = {};

AQ.Test.plan_diff_aux = function(A, B, pkey) {
  // This method is used to recursively check that two plans are equal before and after saving.

  var ignore = [
    '$$hashKey',
    'items',
    'rid',
    'multiselect',
    '_item',
    'ymid_frac',
    'xmid_frac',
    'updated_at',
    'created_at',
    '_marked',
    'test',
    'cost',
    'estimating',
    'drag',
    'uba',
    'errors',
    'sample',
    'leaf',
    'marked',
    'equivalences',
    'next_module_id',
    'inputs',
    'outputs',
    'current_module',
    'from_module',
    'to_module',
    'module_list'
  ];

  if (AQ.Test.num_calls < 100) {
    for (key in A) {
      if (
        A[key] &&
        A[key] != [] &&
        !ignore.includes(key) &&
        typeof A[key] != 'function' &&
        (B[key] === undefined || B[key] === null)
      ) {
        console.log([
          A,
          A.rid,
          ' defines ' + key + ' as ',
          A[key],
          ' but ',
          B,
          B.rid,
          ' does not'
        ]);
      } else if (typeof A[key] == 'object' && B[key] && !ignore.includes(key)) {
        AQ.Test.plan_diff_aux(A[key], B[key], key);
      } else if (
        typeof A[key] != 'function' &&
        !ignore.includes(key) &&
        A[key] != B[key]
      ) {
        console.log([key, A, B, A.rid, B.rid, key, A[key], B[key]]);
      }
    }

    AQ.Test.num_calls++;
  }
};

AQ.Test.plan_diff = function(A, B) {
  console.log(
    '---- CHECKING FOR DIFFERENCES BETWEEN BEFORE AND AFTER SAVING---------------'
  );
  AQ.Test.num_calls = 0;
  AQ.Test.plan_diff_aux(A, B, 'plan');
  console.log(
    '---- DONE CHECKING ---------------------------------------------------------'
  );
};
//
// app/assets/javascripts/models/text_box.js
//

class TextBoxAnchor {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  get record_type() {
    return 'TextBoxAnchor';
  }
}

class TextBox {
  constructor() {
    this.markdown = 'Put **markdown** here.';
    if (
      !this.constructor.next_position ||
      this.constructor.next_position > 300
    ) {
      this.constructor.next_position = 0;
    }
    this.constructor.next_position += 10;
    this.x = 100 + this.constructor.next_position;
    this.y = 100 + this.constructor.next_position;
    this.anchor = new TextBoxAnchor(200, 100);
  }

  from_object(box) {
    this.x = box.x;
    this.y = box.y;
    this.markdown = box.markdown;
    this.anchor = new TextBoxAnchor(box.anchor.x, box.anchor.y);
    return this;
  }

  get record_type() {
    return 'TextBox';
  }

  get width() {
    return this.anchor.x;
  }

  get height() {
    return this.anchor.y;
  }

  get rendered_content() {
    let box = this;
    let md = window.markdownit();
    md.set({ html: true });
    return AQ.sce.trustAsHtml(md.render(box.markdown));
  }

  serialize() {
    let box = this;
    return {
      x: box.x,
      y: box.y,
      anchor: { x: box.anchor.x, y: box.anchor.y },
      markdown: box.markdown
    };
  }
}
//
// app/assets/javascripts/models/timing.js
//

AQ.Timing.default = function() {
  return AQ.Timing.record({
    start: 8 * 60,
    stop: 8 * 60 + 30,
    days: '[|Mo"]',
    active: false
  });
};

AQ.Timing.record_getters.start_time = function() {
  var t = this;
  delete t.start_time;
  t.start_time = { hour: Math.floor(t.start / 60), minute: t.start % 60 };
  return t.start_time;
};

AQ.Timing.record_getters.stop_time = function() {
  var t = this;
  delete t.stop_time;
  t.stop_time = { hour: Math.floor(t.stop / 60), minute: t.stop % 60 };
  return t.stop_time;
};

AQ.Timing.record_getters.days_of_week = function() {
  var t = this;
  delete t.days_of_week;

  try {
    t.days_of_week = JSON.parse(t.days);
  } catch (e) {
    t.days_of_week = [];
  }

  return t.days_of_week;
};

AQ.Timing.record_methods.recompute = function() {
  var t = this;
  t.recompute_getter('start_time');
  t.recompute_getter('stop_time');
  t.recompute_getter('days_of_week');
  t.recompute_getter('as_string');
};

AQ.Timing.record_methods.save = function() {
  var t = this;

  t.start = t.start_form.hour * 60 + t.start_form.minute;
  if (t.start_form.ampm == 'pm' && t.start_form.hour != 12) {
    t.start += 12 * 60;
  }
  t.stop = t.stop_form.hour * 60 + t.stop_form.minute;
  if (t.stop_form.ampm == 'pm' && t.stop_form.hour != 12) {
    t.stop += 12 * 60;
  }
  t.days = JSON.stringify(
    aq.where(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'], w => t[w])
  );

  if (t.id) {
    AQ.http.put('/timings/' + t.id, { timing: t }).then(t.recompute);
  } else {
    AQ.http.post('/timings', { timing: t }).then(t.recompute);
  }
};

AQ.Timing.record_methods.make_form = function() {
  var t = this,
    start_hour = Math.floor(t.start / 60),
    stop_hour = Math.floor(t.stop / 60);

  if (start_hour == 12) {
    start_ampm = 'pm';
  } else if (start_hour > 12) {
    start_hour -= 12;
    start_ampm = 'pm';
  } else {
    start_ampm = 'am';
  }

  if (stop_hour == 12) {
    stop_ampm = 'pm';
  } else if (stop_hour > 12) {
    stop_hour -= 12;
    stop_ampm = 'pm';
  } else {
    stop_ampm = 'am';
  }

  t.start_form = {
    hour: start_hour,
    minute: t.start % 60,
    ampm: start_ampm
  };

  t.stop_form = {
    hour: stop_hour,
    minute: t.stop % 60,
    ampm: stop_ampm
  };

  aq.each(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'], m => {
    t[m] = t.days_of_week ? t.days_of_week.indexOf(m) >= 0 : false;
  });

  return t;
};

AQ.Timing.format = function(data) {
  var m = data.minute;
  if (m < 10) {
    m = '0' + m;
  }
  return data.hour + ':' + m + ' ' + data.ampm;
};

AQ.Timing.record_getters.as_string = function() {
  var t = this;

  delete t.as_string;
  t.make_form();

  t.as_string =
    AQ.Timing.format(t.start_form) + ' to ' + AQ.Timing.format(t.stop_form);

  if (t.days_of_week.length > 0) {
    t.as_string += ': ' + t.days_of_week.join(', ');
  }

  return t.as_string;
};

AQ.Timing.minutes_since_midnight = function() {
  var d = new Date();
  return d.getHours() * 60 + d.getMinutes();
};

AQ.Timing.record_methods.compute_status = function() {
  var t = this;
  delete t.status;

  var m = AQ.Timing.minutes_since_midnight();

  if (!t.active) {
    t.status = 'none';
  } else if (m < t.start) {
    t.status = 'future';
  } else if (t.start <= m && m <= t.stop) {
    t.status = 'present';
  } else if (t.stop < m) {
    t.status = 'past';
  } else {
    t.status = 'none';
  }

  return t.status;
};

AQ.Timing.record_getters.status = function() {
  setInterval(this.compute_status, 1000);
  return this.compute_status();
};

//
// app/assets/javascripts/models/transaction.js
//

AQ['Transaction'] = new AQ.Base('Account');
AQ['TransactionLog'] = new AQ.Base('AccountLog');

//
// Asynchronously returns the list of transactions for the given month, year,
// budget_id, and user_id.
//
AQ.Transaction.where_month = function(
  month,
  year,
  budget_id = -1,
  user_id = -1
) {
  let query = `MONTH(created_at) = ${month} AND YEAR(created_at) = ${year}`;
  let transactions = null;

  if (budget_id != -1) {
    query += ` AND budget_id = ${budget_id}`;
  }

  if (user_id != -1) {
    query += ` AND user_id = ${user_id}`;
  }

  // TODO: move query into rails controller/model
  return AQ.Transaction.where(query, { include: ['user', 'operation'] })
    .then(result => (transactions = result))
    .then(() =>
      AQ.PlanAssociation.where(
        {
          operation_id: aq.collect(transactions, t => t.operation_id)
        },
        {
          include: ['plan']
        }
      )
    )
    .then(plan_associations => {
      aq.each(plan_associations, pa => {
        aq.each(transactions, t => {
          if (pa.operation_id == t.operation_id) {
            t.plan_id = pa.plan_id;
            t.plan_name = pa.plan.name;
          }
        });
      });
      return transactions;
    });
};

/*

  Transaction math

  For debits:
    amount = raw cost
            = raw materials cost for material entries
            = labor_rate * labor_minutes for labor entries
    total cost = amount * ( 1 + markup_rate )

  For credits:
    amount = amount credited. labor_rate and markup_rate not used.

 */

// Total amount, including overhead
AQ.Transaction.record_getters.total = function() {
  if (this.transaction_type == 'debit') {
    return this.amount * (1 + this.markup_rate);
  } else {
    return -this.amount;
  }
};

// Number of minutes of labor
AQ.Transaction.record_getters.labor_minutes = function() {
  // amount = labor_rate * labor_minutes
  if (this.category == 'labor') {
    return this.amount / this.labor_rate;
  } else {
    return 0;
  }
};

// Cost of materials not including overhead
AQ.Transaction.record_getters.materials_base = function() {
  // amount = materials_base
  if (this.category == 'materials') {
    return this.amount / (1 + this.markup_rate);
  } else {
    return 0;
  }
};

// Just the overhead portion
AQ.Transaction.record_getters.markup = function() {
  // overhead = total - amount
  return this.total - this.amount;
};

// Returns a summary of the costs associated with a list of transactions
AQ.Transaction.summarize_aux = function(transactions) {
  let summary = {
    total: aq.sum(transactions, t => t.total),
    labor_minutes: aq.sum(transactions, t => t.labor_minutes),
    materials: aq.sum(transactions, t => t.materials_base),
    overhead: aq.sum(transactions, t => t.markup)
  };

  return summary;
};

// Returns a summary of the costs associated with an operation type
AQ.Transaction.summarize_operation_type = function(
  transactions,
  operation_type_id
) {
  // TODO: eliminate where (?)
  let transaction_list = aq.where(
    transactions,
    t => t.operation.operation_type_id == operation_type_id
  );
  return AQ.Transaction.summarize_aux(transaction_list);
};

// Returns a summary of the transactions, and list of summaries for each operation type used.
AQ.Transaction.summarize = function(transactions) {
  let summary = AQ.Transaction.summarize_aux(transactions);
  let op_type_ids = aq.uniq(
    aq.collect(transactions, t => t.operation.operation_type_id)
  );

  summary.operation_type_summaries = [];
  for (var i in op_type_ids) {
    let id = op_type_ids[i];
    summary.operation_type_summaries[
      id
    ] = AQ.Transaction.summarize_operation_type(transactions, id);
  }

  return summary;
};

// Asynchronously returns all logs used in the list of transactions
AQ.Transaction.get_logs = function(transactions) {
  let transaction_ids = aq.collect(transactions, t => t.id);
  // TODO: eliminate where
  return AQ.TransactionLog.where(
    { row1: transaction_ids },
    { include: 'user' }
  );
};

// Asynchronously applies credits to the list of transactions, returning
// the resulting list of credit transactions and their logs
AQ.Transaction.apply_credit = function(transactions, percent, message) {
  let data = {
    rows: transactions,
    percent: percent,
    note: message
  };

  return AQ.post('/invoices/credit', data).then(result => {
    if (result.data.error) {
      throw result.data.error;
    } else {
      return {
        transactions: aq.collect(result.data.rows, t =>
          AQ.Transaction.record(t)
        ),
        transaction_logs: aq.collect(result.data.notes, l =>
          AQ.TransactionLog.record(l)
        )
      };
    }
  });
};

//
// app/assets/javascripts/models/transaction_log.js
//

AQ['TransactionLog'] = new AQ.Base('AccountLog');

AQ.TransactionLog.getter(AQ.Transaction, 'target', 'row1');
AQ.TransactionLog.getter(AQ.User, 'user');

//
// app/assets/javascripts/models/upload.js
//

AQ.Upload.record_methods.get_expiring_url = function() {
  var upload = this;
  return new Promise(function(resolve, reject) {
    AQ.Upload.where({ id: upload.id }, { methods: ['expiring_url'] }).then(
      uploads => {
        if (uploads.length == 1) {
          resolve(uploads[0].expiring_url);
        }
      }
    );
  });
};

//
// app/assets/javascripts/models/user.js
//

AQ.User.current = function() {
  return new Promise(function(resolve, reject) {
    AQ.get('/json/current').then(response => {
      resolve(AQ.User.record(response.data));
    });
  });
};

AQ.User.record_getters.url = function() {
  return "<a href='/users/" + this.id + "'>" + this.login + '</a>';
};

AQ.User.record_getters.user_budget_associations = function() {
  var user = this;

  delete user.user_budget_associations;

  AQ.UserBudgetAssociation.where({ user_id: user.id }).then(ubas => {
    user.user_budget_associations = aq.collect(ubas, uba =>
      AQ.UserBudgetAssociation.record(uba)
    );
    AQ.update();
  });

  return user.user_budget_associations;
};

AQ.User.active_users = function() {
  return new Promise(function(resolve, reject) {
    AQ.get('/users/active')
      .then(response => {
        var rval = response.data.sort((u1, u2) => {
          if (u1.login < u2.login) {
            return -1;
          } else if (u1.login > u2.login) {
            return 1;
          } else {
            return 0;
          }
        });

        resolve(aq.collect(rval, u => AQ.User.record(u)));
      })
      .catch(response => reject(response.data.errors));
  });
};

AQ.User.record_methods.init_params = function(names) {
  var user = this;

  if (!user.params) {
    user.params = {};
  }

  aq.each(names, n => (user.params[n] = { key: n }));
};

AQ.User.record_getters.parameters = function() {
  var user = this;
  delete user.parameters;

  AQ.Parameter.where({ user_id: user.id }).then(plist => {
    user.parameters = plist;
    if (!user.params) {
      user.params = {};
    }
    aq.each(user.parameters, p => {
      user.params[p.key] = p;
    });
    AQ.update();
  });

  return user.parameters;
};

AQ.User.record_methods.save = function() {
  var user = this;

  delete user.parameters;
  user.parameters = [];
  for (key in user.params) {
    user.parameters.push(user.params[key]);
  }

  AQ.http
    .put('/users/' + user.id, user)
    .then(result => {
      console.log(result);
      user.changed = false;
    })
    .catch(response => alert(response.data.error));
};

AQ.User.record_methods.change_password = function() {
  var user = this;

  AQ.http
    .put('/users/password', user)
    .then(response => {
      delete user.password;
      delete user.password_confirmation;

      alert('Password successfully changed');
    })
    .catch(response => {
      alert(response.data.error);
    });
};

AQ.User.record_getters.stats = function() {
  let user = this;
  delete user.stats;

  AQ.http
    .get('/users/stats/' + user.id)
    .then(response => {
      user.stats = response.data;
      // AQ.update();
    })
    .catch(response => {
      alert(response.data.error);
    });

  return undefined;
};

//
// app/assets/javascripts/models/user_budget_association.js
//

AQ.UserBudgetAssociation.record_getters.budget = function() {
  var uba = this;
  delete uba.budget;

  AQ.Budget.find(uba.budget_id).then(budget => {
    uba.budget = AQ.Budget.record(budget);
    AQ.update();
  });

  return {};
};

//
// app/assets/javascripts/models/wire.js
//

AQ.Wire.make = function(specs) {
  var wire = AQ.Wire.record(specs);

  if (wire.from) {
    wire.from.num_wires++;
  }
  if (wire.to) {
    wire.to.num_wires++;
  }

  return wire;
};

AQ.Wire.record_methods.matching_aft = function() {
  var wire = this;

  if (wire.to.aft && wire.from.aft) {
    return (
      wire.to.aft.sample_type_id == wire.from.aft.sample_type_id &&
      wire.to.aft.object_type_id == wire.from.aft.object_type_id
    );
  } else {
    return true;
  }
};

AQ.Wire.record_methods.matching_sample = function() {
  var wire = this,
    from_sid,
    to_sid;

  if (wire.from.field_type.array) {
    from_sid = wire.from.sample_identifier;
  } else {
    from_sid = wire.from_op.routing[wire.from.routing];
  }

  if (wire.to.field_type.array) {
    to_sid = wire.to.sample_identifier;
  } else {
    to_sid = wire.to_op.routing[wire.to.routing];
  }

  return !from_sid || !to_sid || from_sid == to_sid;
};

AQ.Wire.record_methods.consistent = function() {
  var wire = this;

  return wire.matching_aft() && wire.matching_sample();
};

AQ.Wire.record_methods.disconnect = function() {
  var wire = this;

  if (wire.from) {
    wire.from.num_wires--;
    delete wire.from;
    delete wire.from_op;
  }
  if (wire.to) {
    wire.to.num_wires--;
    delete wire.to;
    delete wire.to_op;
  }

  return wire;
};

AQ.Wire.record_getters.x0 = function() {
  return (
    this.from_op.x +
    this.from_op.width / 2 +
    (this.from.index - this.from_op.num_outputs / 2.0 + 0.5) * AQ.snap
  );
};

AQ.Wire.record_getters.y0 = function() {
  return this.from_op.y;
};

AQ.Wire.record_getters.x1 = function() {
  return (
    this.to_op.x +
    this.to_op.width / 2 +
    (this.to.index - this.to_op.num_inputs / 2.0 + 0.5) * AQ.snap
  );
};

AQ.Wire.record_getters.y1 = function() {
  return this.to_op.y + this.to_op.height;
};

AQ.Wire.record_getters.ymid = function() {
  if (!this.ymid_frac) {
    this.ymid_frac = 0.5;
  }
  return this.ymid_frac * (this.y0 + this.y1);
};

AQ.Wire.record_getters.xmid = function() {
  if (!this.xmid_frac) {
    this.xmid_frac = 0.5;
  }
  return this.xmid_frac * (this.x0 + this.x1);
};

AQ.Wire.record_getters.yint0 = function() {
  return this.y0 - AQ.snap;
};

AQ.Wire.record_getters.yint1 = function() {
  return this.y1 + AQ.snap;
};

AQ.Wire.record_getters.path = function() {
  if (this.y0 >= this.y1 + 2 * AQ.snap) {
    return (
      '' +
      this.x0 +
      ',' +
      this.y0 +
      ' ' +
      this.x0 +
      ',' +
      this.ymid +
      ' ' +
      this.x1 +
      ',' +
      this.ymid +
      ' ' +
      this.x1 +
      ',' +
      this.y1
    );
  } else {
    return (
      '' +
      this.x0 +
      ',' +
      this.y0 +
      ' ' +
      this.x0 +
      ' ' +
      this.yint0 +
      ' ' +
      this.xmid +
      ',' +
      this.yint0 +
      ' ' +
      this.xmid +
      ',' +
      this.yint1 +
      ' ' +
      this.x1 +
      ',' +
      this.yint1 +
      ' ' +
      this.x1 +
      ',' +
      this.y1
    );
  }
};

AQ.Wire.record_getters.arrowhead = function() {
  return (
    'M ' +
    this.x1 +
    ' ' +
    (this.y1 + 5) +
    ' L ' +
    (this.x1 + 0.25 * AQ.snap) +
    ' ' +
    (this.y1 + 0.75 * AQ.snap) +
    ' L ' +
    (this.x1 - 0.25 * AQ.snap) +
    ' ' +
    (this.y1 + 0.75 * AQ.snap) +
    ' Z'
  );
};

AQ.Wire.record_getters.to_s = function() {
  return '' + this.from.rid + '->' + this.to.rid;
};

//
// gofish sequel
//

AQ.config = {
  aquarium_url: 'http://52.27.43.242/'
};

AQ.next_record_id = 0;

AQ.login = function(username, password) {
  return new Promise(function(resolve, reject) {
    var data = { json: { session: { login: username, password: password } } };
    request.post(AQ.config.aquarium_url + '/sessions.json', data, function(
      error,
      response,
      body
    ) {
      console.log('got post result');
      if (!error && response.statusCode == 200) {
        AQ.login_headers = response.headers;
        console.log('AQ: LOGIN OK');
        resolve(body);
      } else {
        console.log('AQ: COULD NOT LOG IN');
        reject("Could not log in to Aquarium server. Check Nemo's settings.");
      }
    });
  });
};

AQ.login_interactive = function() {
  var rl = readline.createInterface(process.stdin, process.stdout);

  function hidden(query, callback) {
    var stdin = process.openStdin(),
      i = 0;

    process.stdin.on('data', function(char) {
      char = char + '';
      switch (char) {
        case '\n':
        case '\r':
        case '\u0004':
          stdin.pause();
          break;
        default:
          process.stdout.write(
            '\033[2K\033[200D' + query + Array(rl.line.length + 1).join('*')
          );
          i++;
          break;
      }
    });

    rl.question(query, function(value) {
      rl.history = rl.history.slice(1);
      callback(value);
    });
  }

  return new Promise(function(resolve, reject) {
    rl.question('username> ', username => {
      hidden('password> ', password => {
        rl.close();
        AQ.login(username, password)
          .then(resolve)
          .catch(reject);
      });
    });
  });
};

AQ.get = function(path) {
  var headers;

  if (AQ.login_headers) {
    headers = {
      cookie: AQ.login_headers['set-cookie']
    };
  } else {
    headers = {};
  }

  return new Promise(function(resolve, reject) {
    request.get(
      {
        url: AQ.config.aquarium_url + path,
        headers: headers
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve({ data: body });
        } else {
          console.log([error, response, body]);
          reject({ error: error, statusCode: response.statusCode, body: body });
        }
      }
    );
  });
};

AQ.post = function(path, data) {
  var headers;

  var c = AQ.login_headers['set-cookie'];
  c.push(c[0].replace('remember_token_development', 'remember_token'));

  if (AQ.login_headers) {
    headers = {
      cookie: c
    };
  } else {
    headers = {};
  }

  return new Promise(function(resolve, reject) {
    request(
      {
        method: 'post',
        url: AQ.config.aquarium_url + path,
        headers: headers,
        json: data
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve({ data: body });
        } else {
          console.log(data);
          reject({ error: error, statusCode: response.statusCode, body: body });
        }
      }
    );
  });
};

module.exports = AQ;
