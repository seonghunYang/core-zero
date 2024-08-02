## 왜 헤드리스 컴포넌트인가?

단순히 보기 좋은 컴포넌트를 만드는 것은 비교적 쉬운 일입니다. 그러나 완성도가 높고 사용자에게 최상의 경험을 제공하는 컴포넌트를 만드는 것은 결코 쉽지 않습니다. 특히 많은 팀이 비즈니스 로직 작성에만도 벅차기 때문에, 이러한 완성도 높은 컴포넌트를 만드는 데 필요한 리소스나 시간이 부족한 경우가 많습니다. 그러나 **접근성과 상호 작용의 부족은 사람들이 생각하는 것 이상으로 사용자 경험을 심각하게 저하시킬 수 있습니다**.

헤드리스 컴포넌트는 이러한 문제를 해결합니다. 헤드리스 컴포넌트는 특정 UI 스타일을 가지지 않고, 로직과 상태 관리만을 담당하는 컴포넌트입니다. 헤드리스 컴포넌트에는 뷰 로직, 키보드 탐색, 접근성, 터치 상호 작용 등 뛰어난 웹 앱 사용자 경험을 제공하기 위한 기능이 미리 내장되어 있습니다. 사용자는 이러한 헤드리스 컴포넌트를 가져와 팀의 UI 스타일에 맞춰 커스텀하여 사용하면, 완성도 높은 컴포넌트를 쉽게 구축할 수 있습니다.

참고자료: [https://martinfowler.com/articles/headless-component.html](https://martinfowler.com/articles/headless-component.html)

## 왜 직접 구현하는가?

이미 많은 오픈소스 프로젝트들이 헤드리스 컴포넌트를 구현하고 있습니다. 예를 들어, radix-ui와 headless-ui는 완전한 컴포넌트를 제공하며, Downshift는 사용자가 더 유연하게 사용할 수 있는 hook을 제공합니다. 이 외에도 다양한 헤드리스 컴포넌트 오픈소스 프로젝트들이 존재합니다. 

하지만 제 개인적인 생각에 따르면, **현존하는 대부분의 헤드리스 오픈소스들은 지나치게 규격화되어 있거나 지나치게 자유롭습니다.** 예를 들어, radix-ui와 headless-ui는 제공하는 규격 내에서는 쉽게 사용할 수 있으나, 제공하는 컴포넌트와 인터페이스의 한계를 벗어나면 사용이 급격히 어려워집니다. 반면에, Downshift와 같은 Hooks을 제공하는 형태는 기본적인 제약이 없어 사용이 매우 유연하지만, 그만큼 러닝 커브가 높아질 수밖에 없습니다.

대부분의 요구사항은 기본적인 동작만으로도 충족될 수 있기 때문에, 헤드리스 컴포넌트는 우선 사용이 간단해야 합니다. 동시에, 복잡한 요구사항이 발생할 경우 사용자가 상황에 맞게 고급 커스터마이징을 할 수 있어야 합니다. 요구사항은 언제든지 변경될 수 있기 때문에, 하나의 라이브러리에 의존하려면 이를 모두 지원할 수 있어야 합니다. 즉, 헤드리스 컴포넌트는 높은 유연성을 가져야 합니다. 

그러나 기존의 오픈소스들은 충분한 유연성을 제공하지 못합니다. 따라서 저는 **유연성이 높고 어떤 프로젝트에서도 사용할 수 있는 헤드리스 컴포넌트를 목표로 점진적으로 개발하기로 결정했습니다.** 헤드리스 컴포넌트는 특정 스타일에 얽매이지 않기 때문에, 오랫동안 귀중한 자산이 될 것이라고 믿습니다.

뿐만 아니라, 특정 오픈소스에 의존하면 해당 오픈소스가 사용하는 컴포넌트를 업데이트할 때까지 기다려야 하는 의존성이 생깁니다. 이러한 상황에서 직접 헤드리스 컴포넌트를 구현해본 경험은 개발의 효율성을 높일 것이라고 생각합니다.

> **Note:** 아직 개발 중인 프로젝트 입니다.


## 인터페이스

### Simple

```jsx
function Popover() {
  return (
    <Popover>
      <Popover.Trigger>click</Popover.Trigger>
      <Popover.Content>
        <div>Popover content</div>
      </Popover.Content>
    </Popover>
  );
}
```

### With Render props

```jsx
function Popover() {
  return (
    <Popover>
      <Popover.Trigger>click</Popover.Trigger>
      <Popover.Content>
        {({ isOpen, focus, hover }) => (
          <div className={clsx("group flex gap-2", focus && "bg-blue-100")}>
            {focus && <CheckIcon className="size-5" />}
            <div>Popover content</div>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
```

### Simple control

```jsx
function Popover() {
  const [isOpen, setOpen] = useState(false);

  const handleChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <>
      <Popover isOpen={isOpen} onChange={handleChange}>
        <Popover.Trigger>click</Popover.Trigger>
        <Popover.Content>This is the content of the popover.</Popover.Content>
      </Popover>
    </>
  );
}
```

### Control with hook

```jsx
function Popover() {
  const { rootProps } = usePopover({ defaultOpen: false });

  return (
    <>
      <Popover {...rootProps}>
        <Popover.Trigger>click</Popover.Trigger>
        <Popover.Content>
          <div>Popover content</div>
        </Popover.Content>
      </Popover>
    </>
  );
}
```

### Custom logic

```jsx
function Popover() {
  const { rootProps, close } = usePopover({ defaultOpen: false });

  const handleClose = () => {
    logger();
    close();
  };
  return (
    <>
      <Popover {...rootProps} onClose={handleClose}>
        <Popover.Trigger>click</Popover.Trigger>
        <Popover.Content>
          <div>Popover content</div>
        </Popover.Content>
      </Popover>
    </>
  );
}

// 혹은
function Popover() {
  const { getRootProps, close } = usePopover({ defaultOpen: false });

  const handleClose = () => {
    logger();
    close();
  };

  return (
    <>
      <Popover
        {...getRootProps({
          onclose: handleClose,
        })}
      >
        <Popover.Trigger>click</Popover.Trigger>
        <Popover.Content>
          <div>Popover content</div>
        </Popover.Content>
      </Popover>
    </>
  );
}
```
### Polymorphic component

```jsx
function Popover() {
  const { rootProps } = usePopover<HTMLDivElement>({
    defaultOpen: false,
  });

  return (
    <>
      <Popover {...rootProps}>
        <Popover.Trigger as="div">click</Popover.Trigger>
        <Popover.Content>
          <div>Popover content</div>
        </Popover.Content>
      </Popover>
    </>
  );
}

```

### Custom component

```jsx
function Popover() {
  const { rootProps, triggerProps } = usePopover<HTMLDivElement>({
    defaultOpen: false,
  });

  return (
    <>
      <Popover {...rootProps}>
        <div {...triggerProps}>click</div>
        <Popover.Content>
          <div>Popover content</div>
        </Popover.Content>
      </Popover>
    </>
  );
}

// custom ref
function Popover() {
  const ref = useRef<HTMLDivElement>(null);
  const { rootProps, triggerProps } = usePopover({
    defaultOpen: false,
    triggerRef: ref,
  });

  return (
    <>
      <Popover {...rootProps}>
        <div {...triggerProps}>click</div>
        <Popover.Content>
          <div>Popover content</div>
        </Popover.Content>
      </Popover>
    </>
  );
}
```
### Without Compound Component

```jsx
function Popover() {
  const { rootProps, triggerProps, popoverProps } = usePopover({
    defaultOpen: false,
  });

  return (
    <>
      <div {...rootProps}>
        <button {...triggerProps}>click</button >
        <div {...popoverProps}>
          <div>Popover content</div>
        </div>
      </div>
    </>
  );
}

// 혹은
function Popover() {
  const { rootProps, triggerProps, popoverProps } = usePopover({
    defaultOpen: false,
  });

  return (
    <>
      <div {...rootProps}>
        <button {...triggerProps}>click</button >
        <PopoverContent {...popoverProps}>
          <div>Popover content</div>
        </PopoverContent >
      </div>
    </>
  );
}
```

