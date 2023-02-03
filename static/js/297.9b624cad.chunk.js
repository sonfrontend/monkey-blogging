"use strict";(self.webpackChunkmonkey_blogging=self.webpackChunkmonkey_blogging||[]).push([[297],{297:function(e,t,n){n.r(t);var r=n(4165),a=n(1413),s=n(5861),c=n(9439),i=n(9062),u=n(2791),o=n(1134),l=n(3504),d=n(4167),h=n(5456),p=n(9501),m=n(6779),f=n(3031),g=n(3117),x=n(6848),j=n(8980),v=n(1199),Z=n(921),b=n(3585),y=n(3030),k=n(9085),w=(n(6009),n(6770)),E=n.n(w),N=n(8113),I=n(4569),S=n.n(I),C=n(333),U=n.n(C),_=n(184);w.Quill.register("modules/imageUploader",N.Z);t.default=function(){var e=(0,l.lr)(),t=(0,c.Z)(e,1)[0].get("id"),n=(0,u.useState)([]),w=(0,c.Z)(n,2),N=w[0],I=w[1],C=(0,u.useState)(""),D=(0,c.Z)(C,2),P=D[0],J=D[1],L=(0,u.useState)(""),T=(0,c.Z)(L,2),R=T[0],V=T[1],O=(0,o.cI)({mode:"onChange",defaultValues:{title:"",slug:"",content:"",status:1,hot:!1,image:"",category:{},user:{}}}),A=O.handleSubmit,Y=O.control,F=O.watch,Q=O.setValue,q=O.reset,G=O.getValues,z=O.formState,M=z.isValid,B=z.isSubmitting,H=G("image"),K=G("image_name"),W=(0,Z.Z)(Q,G,K,(function(){return re.apply(this,arguments)})),X=W.image,$=W.setImage,ee=(W.handleResetImage,W.progress),te=W.handleSelectImage,ne=W.handleDeleteImage;function re(){return(re=(0,s.Z)((0,r.Z)().mark((function e(){var n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=(0,i.JU)(v.db,"postId",t),e.next=3,(0,i.r7)(n,{image:""});case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}(0,u.useEffect)((function(){$(H)}),[$,H]),(0,u.useEffect)((function(){function e(){return(e=(0,s.Z)((0,r.Z)().mark((function e(){var t,n,s,c;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=(0,i.hJ)(v.db,"categories"),n=(0,i.IO)(t,(0,i.ar)("status",">=",1)),e.next=4,(0,i.PL)(n);case 4:s=e.sent,c=[],s.forEach((function(e){c.push((0,a.Z)({id:e.id},e.data()))})),I(c);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);var ae=F("hot"),se=F("status");(0,u.useEffect)((function(){function e(){return(e=(0,s.Z)((0,r.Z)().mark((function e(){var n,s,c,u;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return");case 2:return n=(0,i.JU)(v.db,"posts",t),e.next=5,(0,i.QT)(n);case 5:(s=e.sent).data()&&(q((0,a.Z)({id:s.id},s.data())),J((null===(c=s.data())||void 0===c?void 0:c.category)||""),V((null===(u=s.data())||void 0===u?void 0:u.content)||""));case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}M&&function(){e.apply(this,arguments)}()}),[t,M,q]);var ce=function(){var e=(0,s.Z)((0,r.Z)().mark((function e(t){var n,s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=(0,i.JU)(v.db,"categories",t.id),e.next=3,(0,i.QT)(n);case 3:s=e.sent,Q("category",(0,a.Z)({id:s.id},s.data())),J(t);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ie=function(){var e=(0,s.Z)((0,r.Z)().mark((function e(n){var s;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=(0,i.JU)(v.db,"posts",t),n.status=Number(n.status),n.slug=U()(n.slug||n.title,{lower:!0}),e.next=5,(0,i.r7)(s,(0,a.Z)((0,a.Z)({},n),{},{image:X,content:R}));case 5:k.Am.success("Update post successfully!");case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ue=(0,u.useMemo)((function(){return{toolbar:[["bold","italic","underline","strike"],["blockquote"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{header:[1,2,3,4,5,6,!1]}],["link","image"]],imageUploader:{upload:function(){var e=(0,s.Z)((0,r.Z)().mark((function e(t){var n,a;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=new FormData).append("image",t),e.next=4,S()({method:"POST",url:"https://api.imgbb.com/1/upload?key=00a22eac82c2669afff11586e7dc8125",data:n,header:{"Content-Type":"multipart/form-data"}});case 4:return a=e.sent,e.abrupt("return",a.data.data.url);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}}}),[]);return t?(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(y.Z,{title:"Update post",desc:"Update post content"}),(0,_.jsxs)("form",{onSubmit:A(ie),children:[(0,_.jsxs)("div",{className:"form-layout",children:[(0,_.jsxs)(m.g,{children:[(0,_.jsx)(x._,{children:"Title"}),(0,_.jsx)(g.I,{control:Y,placeholder:"Enter your title",name:"title",required:!0})]}),(0,_.jsxs)(m.g,{children:[(0,_.jsx)(x._,{children:"Slug"}),(0,_.jsx)(g.I,{control:Y,placeholder:"Enter your slug",name:"slug"})]})]}),(0,_.jsxs)("div",{className:"form-layout",children:[(0,_.jsxs)(m.g,{children:[(0,_.jsx)(x._,{children:"Image"}),(0,_.jsx)(f.Z,{onChange:te,handleDeleteImage:ne,className:"h-[250px]",progress:ee,image:X})]}),(0,_.jsxs)(m.g,{children:[(0,_.jsx)(x._,{children:"Category"}),(0,_.jsxs)(p.L,{children:[(0,_.jsx)(p.L.Select,{placeholder:"Select the category"}),(0,_.jsx)(p.L.List,{children:N.length>0&&N.map((function(e){return(0,_.jsx)(p.L.Option,{onClick:function(){return ce(e)},children:e.name},e.id)}))})]}),(null===P||void 0===P?void 0:P.name)&&(0,_.jsx)("span",{className:"inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50",children:null===P||void 0===P?void 0:P.name})]})]}),(0,_.jsx)("div",{className:"mb-10",children:(0,_.jsxs)(m.g,{children:[(0,_.jsx)(x._,{children:"Content"}),(0,_.jsx)("div",{className:"w-full entry-content",children:(0,_.jsx)(E(),{modules:ue,theme:"snow",value:R,onChange:V})})]})}),(0,_.jsxs)("div",{className:"form-layout",children:[(0,_.jsxs)(m.g,{children:[(0,_.jsx)(x._,{children:"Feature post"}),(0,_.jsx)(j.Z,{on:!0===ae,onClick:function(){return Q("hot",!ae)}})]}),(0,_.jsxs)(m.g,{children:[(0,_.jsx)(x._,{children:"Status"}),(0,_.jsxs)(m.Y,{children:[(0,_.jsx)(h.Y,{name:"status",control:Y,checked:Number(se)===b.cf.APPROVED,value:b.cf.APPROVED,children:"Approved"}),(0,_.jsx)(h.Y,{name:"status",control:Y,checked:Number(se)===b.cf.PENDING,value:b.cf.PENDING,children:"Pending"}),(0,_.jsx)(h.Y,{name:"status",control:Y,checked:Number(se)===b.cf.REJECTED,value:b.cf.REJECTED,children:"Reject"})]})]})]}),(0,_.jsx)(d.z,{type:"submit",className:"mx-auto w-[250px]",kind:"primary",isLoading:B,disabled:B,children:"Update post"})]})]}):null}}}]);
//# sourceMappingURL=297.9b624cad.chunk.js.map