/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = globalThis, Y = j.ShadowRoot && (j.ShadyCSS === void 0 || j.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, gt = Symbol(), st = /* @__PURE__ */ new WeakMap();
let Ut = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== gt)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Y && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = st.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && st.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const mt = (s) => new Ut(typeof s == "string" ? s : s + "", void 0, gt), Ht = (s, t) => {
  if (Y)
    s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else
    for (const e of t) {
      const i = document.createElement("style"), r = j.litNonce;
      r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, s.appendChild(i);
    }
}, it = Y ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules)
    e += i.cssText;
  return mt(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ot, defineProperty: Mt, getOwnPropertyDescriptor: Lt, getOwnPropertyNames: Rt, getOwnPropertySymbols: Nt, getPrototypeOf: It } = Object, g = globalThis, rt = g.trustedTypes, jt = rt ? rt.emptyScript : "", q = g.reactiveElementPolyfillSupport, T = (s, t) => s, z = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? jt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, tt = (s, t) => !Ot(s, t), ot = { attribute: !0, type: String, converter: z, reflect: !1, hasChanged: tt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), g.litPropertyMetadata ?? (g.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class b extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ot) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && Mt(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: r, set: o } = Lt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get() {
      return r == null ? void 0 : r.call(this);
    }, set(n) {
      const l = r == null ? void 0 : r.call(this);
      o.call(this, n), this.requestUpdate(t, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ot;
  }
  static _$Ei() {
    if (this.hasOwnProperty(T("elementProperties")))
      return;
    const t = It(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(T("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(T("properties"))) {
      const e = this.properties, i = [...Rt(e), ...Nt(e)];
      for (const r of i)
        this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0)
        for (const [i, r] of e)
          this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const r = this._$Eu(e, i);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i)
        e.unshift(it(r));
    } else
      t !== void 0 && e.push(it(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys())
      this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ht(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$EC(t, e) {
    var o;
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const n = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : z).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o;
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = i.getPropertyOptions(r), l = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((o = n.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? n.converter : z;
      this._$Em = r, this[r] = l.fromAttribute(e, n.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, i) {
    if (t !== void 0) {
      if (i ?? (i = this.constructor.getPropertyOptions(t)), !(i.hasChanged ?? tt)(this[t], e))
        return;
      this.P(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(t, e, i) {
    this._$AL.has(t) || this._$AL.set(t, e), i.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, n] of this._$Ep)
          this[o] = n;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0)
        for (const [o, n] of r)
          n.wrapped !== !0 || this._$AL.has(o) || this[o] === void 0 || this.P(o, this[o], n);
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((r) => {
        var o;
        return (o = r.hostUpdate) == null ? void 0 : o.call(r);
      }), this.update(e)) : this._$EU();
    } catch (r) {
      throw t = !1, this._$EU(), r;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var r;
      return (r = i.hostUpdated) == null ? void 0 : r.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((e) => this._$EC(e, this[e]))), this._$EU();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[T("elementProperties")] = /* @__PURE__ */ new Map(), b[T("finalized")] = /* @__PURE__ */ new Map(), q == null || q({ ReactiveElement: b }), (g.reactiveElementVersions ?? (g.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x = globalThis, D = x.trustedTypes, nt = D ? D.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, yt = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, vt = "?" + _, zt = `<${vt}>`, A = document, H = () => A.createComment(""), O = (s) => s === null || typeof s != "object" && typeof s != "function", At = Array.isArray, Dt = (s) => At(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", V = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, at = /-->/g, lt = />/g, m = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ht = /'/g, ct = /"/g, bt = /^(?:script|style|textarea|title)$/i, kt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), dt = kt(1), S = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), pt = /* @__PURE__ */ new WeakMap(), v = A.createTreeWalker(A, 129);
function St(s, t) {
  if (!Array.isArray(s) || !s.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return nt !== void 0 ? nt.createHTML(t) : t;
}
const Bt = (s, t) => {
  const e = s.length - 1, i = [];
  let r, o = t === 2 ? "<svg>" : "", n = P;
  for (let l = 0; l < e; l++) {
    const a = s[l];
    let c, p, h = -1, u = 0;
    for (; u < a.length && (n.lastIndex = u, p = n.exec(a), p !== null); )
      u = n.lastIndex, n === P ? p[1] === "!--" ? n = at : p[1] !== void 0 ? n = lt : p[2] !== void 0 ? (bt.test(p[2]) && (r = RegExp("</" + p[2], "g")), n = m) : p[3] !== void 0 && (n = m) : n === m ? p[0] === ">" ? (n = r ?? P, h = -1) : p[1] === void 0 ? h = -2 : (h = n.lastIndex - p[2].length, c = p[1], n = p[3] === void 0 ? m : p[3] === '"' ? ct : ht) : n === ct || n === ht ? n = m : n === at || n === lt ? n = P : (n = m, r = void 0);
    const f = n === m && s[l + 1].startsWith("/>") ? " " : "";
    o += n === P ? a + zt : h >= 0 ? (i.push(c), a.slice(0, h) + yt + a.slice(h) + _ + f) : a + _ + (h === -2 ? l : f);
  }
  return [St(s, o + (s[e] || "<?>") + (t === 2 ? "</svg>" : "")), i];
};
class M {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const l = t.length - 1, a = this.parts, [c, p] = Bt(t, e);
    if (this.el = M.createElement(c, i), v.currentNode = this.el.content, e === 2) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (r = v.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes())
          for (const h of r.getAttributeNames())
            if (h.endsWith(yt)) {
              const u = p[n++], f = r.getAttribute(h).split(_), N = /([.?@])?(.*)/.exec(u);
              a.push({ type: 1, index: o, name: N[2], strings: f, ctor: N[1] === "." ? qt : N[1] === "?" ? Vt : N[1] === "@" ? Zt : W }), r.removeAttribute(h);
            } else
              h.startsWith(_) && (a.push({ type: 6, index: o }), r.removeAttribute(h));
        if (bt.test(r.tagName)) {
          const h = r.textContent.split(_), u = h.length - 1;
          if (u > 0) {
            r.textContent = D ? D.emptyScript : "";
            for (let f = 0; f < u; f++)
              r.append(h[f], H()), v.nextNode(), a.push({ type: 2, index: ++o });
            r.append(h[u], H());
          }
        }
      } else if (r.nodeType === 8)
        if (r.data === vt)
          a.push({ type: 2, index: o });
        else {
          let h = -1;
          for (; (h = r.data.indexOf(_, h + 1)) !== -1; )
            a.push({ type: 7, index: o }), h += _.length - 1;
        }
      o++;
    }
  }
  static createElement(t, e) {
    const i = A.createElement("template");
    return i.innerHTML = t, i;
  }
}
function E(s, t, e = s, i) {
  var n, l;
  if (t === S)
    return t;
  let r = i !== void 0 ? (n = e._$Co) == null ? void 0 : n[i] : e._$Cl;
  const o = O(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== o && ((l = r == null ? void 0 : r._$AO) == null || l.call(r, !1), o === void 0 ? r = void 0 : (r = new o(s), r._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = r : e._$Cl = r), r !== void 0 && (t = E(s, r._$AS(s, t.values), r, i)), t;
}
class Wt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? A).importNode(e, !0);
    v.currentNode = r;
    let o = v.nextNode(), n = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let c;
        a.type === 2 ? c = new L(o, o.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (c = new Jt(o, this, t)), this._$AV.push(c), a = i[++l];
      }
      n !== (a == null ? void 0 : a.index) && (o = v.nextNode(), n++);
    }
    return v.currentNode = A, r;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class L {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, r) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = E(this, t, e), O(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== S && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Dt(t) ? this.k(t) : this._(t);
  }
  S(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  _(t) {
    this._$AH !== d && O(this._$AH) ? this._$AA.nextSibling.data = t : this.T(A.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = M.createElement(St(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === r)
      this._$AH.p(e);
    else {
      const n = new Wt(r, this), l = n.u(this.options);
      n.p(e), this.T(l), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = pt.get(t.strings);
    return e === void 0 && pt.set(t.strings, e = new M(t)), e;
  }
  k(t) {
    At(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const o of t)
      r === e.length ? e.push(i = new L(this.S(H()), this.S(H()), this, this.options)) : i = e[r], i._$AI(o), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const r = t.nextSibling;
      t.remove(), t = r;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class W {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, r, o) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = d;
  }
  _$AI(t, e = this, i, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0)
      t = E(this, t, e, 0), n = !O(t) || t !== this._$AH && t !== S, n && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = o[0], a = 0; a < o.length - 1; a++)
        c = E(this, l[i + a], e, a), c === S && (c = this._$AH[a]), n || (n = !O(c) || c !== this._$AH[a]), c === d ? t = d : t !== d && (t += (c ?? "") + o[a + 1]), this._$AH[a] = c;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class qt extends W {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Vt extends W {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Zt extends W {
  constructor(t, e, i, r, o) {
    super(t, e, i, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = E(this, t, e, 0) ?? d) === S)
      return;
    const i = this._$AH, r = t === d && i !== d || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== d && (i === d || r);
    r && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Jt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const Z = x.litHtmlPolyfillSupport;
Z == null || Z(M, L), (x.litHtmlVersions ?? (x.litHtmlVersions = [])).push("3.1.3");
const Ft = (s, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = r = new L(t.insertBefore(H(), o), o, void 0, e ?? {});
  }
  return r._$AI(s), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class U extends b {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ft(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return S;
  }
}
var _t;
U._$litElement$ = !0, U.finalized = !0, (_t = globalThis.litElementHydrateSupport) == null || _t.call(globalThis, { LitElement: U });
const J = globalThis.litElementPolyfillSupport;
J == null || J({ LitElement: U });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.0.5");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Kt = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xt = { attribute: !0, type: String, converter: z, reflect: !1, hasChanged: tt }, Gt = (s = Xt, t, e) => {
  const { kind: i, metadata: r } = e;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), o.set(e.name, s), i === "accessor") {
    const { name: n } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(n, a, s);
    }, init(l) {
      return l !== void 0 && this.P(n, void 0, s), l;
    } };
  }
  if (i === "setter") {
    const { name: n } = e;
    return function(l) {
      const a = this[n];
      t.call(this, l), this.requestUpdate(n, a, s);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function et(s) {
  return (t, e) => typeof e == "object" ? Gt(s, t, e) : ((i, r, o) => {
    const n = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, n ? { ...i, wrapped: !0 } : i), n ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Et(s) {
  return et({ ...s, state: !0, attribute: !1 });
}
const Qt = ":host{font-size:12px}";
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Yt = (s, ...t) => ({
  strTag: !0,
  strings: s,
  values: t
}), w = Yt, te = (s) => typeof s != "string" && "strTag" in s, wt = (s, t, e) => {
  let i = s[0];
  for (let r = 1; r < s.length; r++)
    i += t[e ? e[r - 1] : r - 1], i += s[r];
  return i;
};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ct = (s) => te(s) ? wt(s.strings, s.values) : s;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X = "lit-localize-status";
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class ee {
  constructor(t) {
    this.__litLocalizeEventHandler = (e) => {
      e.detail.status === "ready" && this.host.requestUpdate();
    }, this.host = t;
  }
  hostConnected() {
    window.addEventListener(X, this.__litLocalizeEventHandler);
  }
  hostDisconnected() {
    window.removeEventListener(X, this.__litLocalizeEventHandler);
  }
}
const se = (s) => s.addController(new ee(s)), ie = se;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const re = () => (s, t) => (s.addInitializer(ie), s);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Pt {
  constructor() {
    this.settled = !1, this.promise = new Promise((t, e) => {
      this._resolve = t, this._reject = e;
    });
  }
  resolve(t) {
    this.settled = !0, this._resolve(t);
  }
  reject(t) {
    this.settled = !0, this._reject(t);
  }
}
/**
 * @license
 * Copyright 2014 Travis Webb
 * SPDX-License-Identifier: MIT
 */
const $ = [];
for (let s = 0; s < 256; s++)
  $[s] = (s >> 4 & 15).toString(16) + (s & 15).toString(16);
function oe(s) {
  let t = 0, e = 8997, i = 0, r = 33826, o = 0, n = 40164, l = 0, a = 52210;
  for (let c = 0; c < s.length; c++)
    e ^= s.charCodeAt(c), t = e * 435, i = r * 435, o = n * 435, l = a * 435, o += e << 8, l += r << 8, i += t >>> 16, e = t & 65535, o += i >>> 16, r = i & 65535, a = l + (o >>> 16) & 65535, n = o & 65535;
  return $[a >> 8] + $[a & 255] + $[n >> 8] + $[n & 255] + $[r >> 8] + $[r & 255] + $[e >> 8] + $[e & 255];
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ne = "", ae = "h", le = "s";
function he(s, t) {
  return (t ? ae : le) + oe(typeof s == "string" ? s : s.join(ne));
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ut = /* @__PURE__ */ new WeakMap(), $t = /* @__PURE__ */ new Map();
function ce(s, t, e) {
  if (s) {
    const i = (e == null ? void 0 : e.id) ?? de(t), r = s[i];
    if (r) {
      if (typeof r == "string")
        return r;
      if ("strTag" in r)
        return wt(
          r.strings,
          // Cast `template` because its type wasn't automatically narrowed (but
          // we know it must be the same type as `localized`).
          t.values,
          r.values
        );
      {
        let o = ut.get(r);
        return o === void 0 && (o = r.values, ut.set(r, o)), {
          ...r,
          values: o.map((n) => t.values[n])
        };
      }
    }
  }
  return Ct(t);
}
function de(s) {
  const t = typeof s == "string" ? s : s.strings;
  let e = $t.get(t);
  return e === void 0 && (e = he(t, typeof s != "string" && !("strTag" in s)), $t.set(t, e)), e;
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function F(s) {
  window.dispatchEvent(new CustomEvent(X, { detail: s }));
}
let k = "", K, Tt, B, G, xt, y = new Pt();
y.resolve();
let I = 0;
const pe = (s) => (fe((t, e) => ce(xt, t, e)), k = Tt = s.sourceLocale, B = new Set(s.targetLocales), B.add(s.sourceLocale), G = s.loadLocale, { getLocale: ue, setLocale: $e }), ue = () => k, $e = (s) => {
  if (s === (K ?? k))
    return y.promise;
  if (!B || !G)
    throw new Error("Internal error");
  if (!B.has(s))
    throw new Error("Invalid locale code");
  I++;
  const t = I;
  return K = s, y.settled && (y = new Pt()), F({ status: "loading", loadingLocale: s }), (s === Tt ? (
    // We could switch to the source locale synchronously, but we prefer to
    // queue it on a microtask so that switching locales is consistently
    // asynchronous.
    Promise.resolve({ templates: void 0 })
  ) : G(s)).then((i) => {
    I === t && (k = s, K = void 0, xt = i.templates, F({ status: "ready", readyLocale: s }), y.resolve());
  }, (i) => {
    I === t && (F({
      status: "error",
      errorLocale: s,
      errorMessage: i.toString()
    }), y.reject(i));
  }), y.promise;
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let Q = Ct, ft = !1;
function fe(s) {
  if (ft)
    throw new Error("lit-localize can only be configured once");
  Q = s, ft = !0;
}
const _e = {
  s636e4e9798f3d3a5: w`Bonjour. Je suis l'assistant AI de Sierre-Zinal. Que pourrais-je faire pour vous?`,
  s63f0bfacf2c00f6b: w`Bonjour`
}, ge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  templates: _e
}, Symbol.toStringTag, { value: "Module" })), me = {
  s636e4e9798f3d3a5: w`Hello, I'm Sierre-Zinal AI assistant. What can I help you?`,
  s63f0bfacf2c00f6b: w`Hello`
}, ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  templates: me
}, Symbol.toStringTag, { value: "Module" })), ve = "en", Ae = [
  "de",
  "fr"
];
var be = Object.defineProperty, Se = Object.getOwnPropertyDescriptor, R = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Se(t, e) : t, o = s.length - 1, n; o >= 0; o--)
    (n = s[o]) && (r = (i ? n(t, e, r) : n(r)) || r);
  return i && r && be(t, e, r), r;
};
const Ee = /* @__PURE__ */ new Map([
  ["fr", ge],
  ["de", ye]
]), { setLocale: we } = pe({
  sourceLocale: ve,
  targetLocales: Ae,
  //@ts-ignore
  loadLocale: async (s) => Ee.get(s)
});
let C = class extends U {
  constructor() {
    super(), this.prompt = "", this.historics = [];
  }
  connectedCallback() {
    super.connectedCallback(), we("fr"), this.historics = [
      {
        role: "chatbot",
        content: Q(
          w`Hello, I'm Sierre-Zinal AI assistant. What can I help you?`
        )
      }
    ];
  }
  static get styles() {
    return [mt(Qt)];
  }
  render() {
    return dt`
      <div>
        <div>${Q(w`Hello`)}</div>
        <div class="chats">
          ${this.historics.map(
      (s) => dt`
              <div>
                <span class="role"
                  >${s.role === "chatbot" ? "Chatbot" : "You"}:</span
                >&nbsp;
                <span class="chat-content">${s.content}</span>
              </div>
            `
    )}
        </div>
        <div class="prompt" @submit=${this.onSubmit}>
          <form>
            <input
              placeholder="Ask me about Sierre-Zinal"
              .value=${this.prompt}
              @change=${this.onPromptChanged}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    `;
  }
  onPromptChanged(s) {
    s.preventDefault(), this.prompt = s.target.value;
  }
  async onSubmit(s) {
    if (s.preventDefault(), this.prompt.trim()) {
      const t = { role: "user", content: this.prompt.trim() };
      this.historics.push(t), this.getAnswer(this.prompt.trim()), this.prompt = "";
    }
  }
  async getAnswer(s) {
    const t = new Headers();
    t.append("Accept", "application/json"), t.append("Content-Type", "application/json");
    let e = `${this.apiUrl}/run`;
    console.log(`POST ${e}`);
    const i = await fetch(e, {
      headers: t,
      method: "POST",
      body: JSON.stringify({ data: s })
    });
    if (i.body instanceof ReadableStream) {
      const r = { role: "chatbot", content: "" };
      this.historics.push(r);
      const o = i.body.getReader();
      for (; ; ) {
        const { done: n, value: l } = await o.read();
        if (n)
          break;
        const a = new TextDecoder().decode(l);
        r.content = a, console.log(), this.requestUpdate();
      }
    }
  }
};
R([
  Et()
], C.prototype, "prompt", 2);
R([
  et({ type: String, attribute: "api-url" })
], C.prototype, "apiUrl", 2);
R([
  et({ type: String, attribute: "locale" })
], C.prototype, "locale", 2);
R([
  Et()
], C.prototype, "historics", 2);
C = R([
  Kt("sierre-zinal-ai-chatbot"),
  re()
], C);
export {
  C as SierreZinalAIChatbot
};
