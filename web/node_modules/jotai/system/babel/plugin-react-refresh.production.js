System.register(["@babel/template"],function(c){"use strict";var m;return{setters:[function(n){m=n.default}],execute:function(){c("default",u);function n(e,i,t=[]){const o=[...h,...t];if(e.isIdentifier(i)&&o.includes(i.name))return!0;if(e.isMemberExpression(i)){const{property:a}=i;if(e.isIdentifier(a)&&o.includes(a.name))return!0}return!1}const h=["abortableAtom","atom","atomFamily","atomWithDefault","atomWithHash","atomWithImmer","atomWithInfiniteQuery","atomWithMachine","atomWithMutation","atomWithObservable","atomWithProxy","atomWithQuery","atomWithReducer","atomWithReset","atomWithSubscription","atomWithStorage","atomWithStore","freezeAtom","loadable","selectAtom","splitAtom"],s=m.default||m;function u({types:e},i){return{pre({opts:t}){if(!t.filename)throw new Error("Filename must be available")},visitor:{Program:{exit(t){const o=s(`
          globalThis.jotaiAtomCache = globalThis.jotaiAtomCache || {
            cache: new Map(),
            get(name, inst) { 
              if (this.cache.has(name)) {
                return this.cache.get(name)
              }
              this.cache.set(name, inst)
              return inst
            },
          }`)();t.unshiftContainer("body",o)}},ExportDefaultDeclaration(t,o){const{node:a}=t;if(e.isCallExpression(a.declaration)&&n(e,a.declaration.callee,i==null?void 0:i.customAtomNames)){const r=`${o.filename||"unknown"}/defaultExport`,l=s("export default globalThis.jotaiAtomCache.get(%%atomKey%%, %%atom%%)")({atomKey:e.stringLiteral(r),atom:a.declaration});t.replaceWith(l)}},VariableDeclarator(t,o){var a,r;if(e.isIdentifier(t.node.id)&&e.isCallExpression(t.node.init)&&n(e,t.node.init.callee,i==null?void 0:i.customAtomNames)&&((a=t.parentPath.parentPath)!=null&&a.isProgram()||(r=t.parentPath.parentPath)!=null&&r.isExportNamedDeclaration())){const l=`${o.filename||"unknown"}/${t.node.id.name}`,d=s("const %%atomIdentifier%% = globalThis.jotaiAtomCache.get(%%atomKey%%, %%atom%%)")({atomIdentifier:e.identifier(t.node.id.name),atomKey:e.stringLiteral(l),atom:t.node.init});t.parentPath.replaceWith(d)}}}}}}}});
