import 'reflect-metadata'
import { container, DependencyContainer, Lifecycle } from 'tsyringe';
import Scenario from '../step-definition-builders/scenario/scenario';
import TestTrackingSubscribers from '../tracking/test-subscribers';
import TestTrackingEvents from '../tracking/test-tracker';

export type DiContainerWithDefaults = {
  container: DependencyContainer;
};

export function di(): DiContainerWithDefaults {
  const child = container.createChildContainer();
  child.registerInstance('container', child);
  registerDefaultClasses(child);
  return { container: child };
}

function registerDefaultClasses(container: DependencyContainer) {
  register(container, TestTrackingSubscribers);
  register(container, TestTrackingEvents);
  register(container, Scenario)
}

export const defaultContainerScope = { lifecycle: Lifecycle.ContainerScoped };

function register<T>(container: DependencyContainer, provider: Class<T>) {
  container.register<T>(provider, provider, defaultContainerScope);
}

interface Class<T> extends Function {
  new (...args: unknown[]): T;
}
